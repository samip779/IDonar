import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';
import { Equal, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BloodRequestDto } from './dto/blood-request.dto';
import { User } from '../users/entities/user.entity';
import { NOTFOUND } from 'dns';
import { AcceptBloodRequestDto } from './dto/accept-blood-request.dto';
import { getCompatibleBloodGroups } from '../helpers/compatibility';
import { AcceptedBloodRequest } from './entities/accepted-blood-request.entity';
import { PushNotificationService } from '../push-notification/push-notification.service';
import { NotificationService } from '../notification/notification.service';
import { triggerAsyncId } from 'async_hooks';
import { AcceptBloodRequestStatus, BloodRequestStatus } from './enums';
import { ICoordinate, calculateDistance } from '../helpers/distance';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private readonly bloodRequestsRepository: Repository<BloodRequest>,

    @InjectRepository(AcceptedBloodRequest)
    private readonly acceptedBloodRequestRepository: Repository<AcceptedBloodRequest>,

    private readonly pushNotificationService: PushNotificationService,

    private readonly notificationService: NotificationService,
  ) {}

  async addBloodRequest(bloodRequestDto: BloodRequestDto, requester: User) {
    // if (new Date(bloodRequestDto.donationDate) < new Date())
    //   throw new HttpException(
    //     'donation date should not be in past',
    //     HttpStatus.BAD_REQUEST,
    //   );

    const newRequest = this.bloodRequestsRepository.create({
      ...bloodRequestDto,
      requesterId: requester.id,
    });

    await this.bloodRequestsRepository.save(newRequest);

    this.pushNotificationService.pushNotification({
      title: 'New Blood Request',
      message: `A person in ${bloodRequestDto.address} needs ${bloodRequestDto.bloodGroup}.`,
      pushData: {
        bloodGroup: bloodRequestDto.bloodGroup,
        location: bloodRequestDto.address,
        contactNumber: bloodRequestDto.contactNumber,
      },
    });

    await this.notificationService.insertNotification(
      `New Blood Request Placed, Blood Group : ${bloodRequestDto.bloodGroup}, location: ${bloodRequestDto.address}`,
    );

    return {
      message: 'success',
    };
  }

  async getBloodRequests(userId: string, options?: ICoordinate) {
    const requests = await this.bloodRequestsRepository.find({
      select: {
        id: true,
        patientGender: true,
        patientAge: true,
        bloodGroup: true,
        priority: true,
        status: true,
        // donationDate: true,
        contactNumber: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        latitude: true,
        longitude: true,
      },
      where: {
        status: BloodRequestStatus.PENDING,
        requester: Not(Equal(userId)),
        // requesterId:
        // donationDate: MoreThanOrEqual(new Date()),
      },
      order: {
        priority: 'ASC',
      },
    });

    return requests.map((request) => {
      let distance = null;
      if (
        options.latitide &&
        options.longitude &&
        request.latitude &&
        request.longitude
      ) {
        distance = calculateDistance(
          { latitide: options.latitide, longitude: options.longitude },
          { latitide: request.latitude, longitude: request.longitude },
        );
      }

      delete request.latitude;
      delete request.longitude;

      return {
        ...request,
        compatibleDonors: getCompatibleBloodGroups(request.bloodGroup),
        distance,
      };
    });
  }

  async getBloodRequest(id: string) {
    const bloodRequest = await this.bloodRequestsRepository.findOne({
      select: {
        id: true,
        patientGender: true,
        patientAge: true,
        bloodGroup: true,
        // donationDate: true,
        contactNumber: true,
        address: true,
        createdAt: true,
        status: true,
        updatedAt: true,
        requester: {
          id: true,
          firstname: true,
          lastname: true,
          phone: true,
          email: true,
          gender: true,
        },
      },

      relations: {
        requester: true,
      },
      where: {
        id,
      },
    });

    if (!bloodRequest)
      throw new HttpException('no request with that id', HttpStatus.NOT_FOUND);

    return {
      ...bloodRequest,
      compatibleDonors: getCompatibleBloodGroups(bloodRequest.bloodGroup),
    };
  }

  async acceptBloodRequest(
    acceptBloodRequestDto: AcceptBloodRequestDto,
    user: User,
  ) {
    // check if the blood request id in paylod is available in db
    const bloodRequest = await this.bloodRequestsRepository.findOne({
      where: {
        id: acceptBloodRequestDto.bloodRequestId,
      },
      select: ['id', 'bloodGroup', 'requesterId'],
    });

    if (!bloodRequest)
      throw new HttpException(
        'blood request not found with the provided id',
        HttpStatus.NOT_FOUND,
      );

    // check if the blood group in payload is compatible with the victim's blood group
    const compatibleBloodGroups = getCompatibleBloodGroups(
      bloodRequest.bloodGroup,
    );

    if (!compatibleBloodGroups.includes(acceptBloodRequestDto.donorBloodGroup))
      throw new HttpException(
        'incompatible donor blood group',
        HttpStatus.BAD_REQUEST,
      );

    // finally add donation request to db
    const acceptBloodRequest = this.acceptedBloodRequestRepository.create({
      ...acceptBloodRequestDto,
      acceptedAccountId: user.id,
      requesterId: bloodRequest.requesterId,
    });

    await this.acceptedBloodRequestRepository.save(acceptBloodRequest);

    this.pushNotificationService.pushIndieNotification({
      title: 'Request Accepted',
      message: `${acceptBloodRequestDto.donorFullName} from ${acceptBloodRequestDto.donorAddress} has accepted your blod request`,
      subId: bloodRequest.requesterId,
    });

    const notification = await this.notificationService.insertNotification(
      `${acceptBloodRequestDto.donorFullName} from ${acceptBloodRequestDto.donorAddress} has requested to donate`,
      bloodRequest.requesterId,
    );

    return acceptBloodRequest;
  }

  async getUsersBloodRequests(userId: string) {
    const usersBloodRequests = await this.bloodRequestsRepository.find({
      where: {
        requesterId: userId,
        // donationDate: MoreThan(new Date()),
        status: BloodRequestStatus.PENDING,
      },
      select: [
        'id',
        'patientGender',
        'patientAge',
        'bloodGroup',
        'priority',
        // 'donationDate',
        'contactNumber',
        'address',
        'status',
        'createdAt',
        'updatedAt',
        'status',
      ],
      order: {
        // donationDate: 'ASC',
        priority: 'ASC',
      },
    });

    return usersBloodRequests.map((request) => ({
      ...request,
      compatibleDonors: getCompatibleBloodGroups(request.bloodGroup),
    }));
  }

  async getUserBloodRequest(
    userId: string,
    bloodRequestId: string,
    options?: ICoordinate,
  ) {
    const bloodRequest = await this.bloodRequestsRepository.findOne({
      where: {
        id: bloodRequestId,
        requesterId: userId,
      },
      relations: {
        acceptedBloodRequests: { acceptedAccount: true },
      },
      select: {
        id: true,
        patientAge: true,
        patientGender: true,
        bloodGroup: true,
        // donationDate: true,
        contactNumber: true,
        address: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        acceptedBloodRequests: {
          id: true,
          donorFullName: true,
          donorGender: true,
          donorAge: true,
          donorHeight: true,
          donorWeight: true,
          donorAddress: true,
          donorDiseases: true,
          donorBloodGroup: true,
          donorContactNumber: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          latitude: true,
          longitude: true,
          acceptedAccount: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });

    return {
      ...bloodRequest,
      compatibleDonors: getCompatibleBloodGroups(bloodRequest.bloodGroup),
      acceptedBloodRequests: bloodRequest.acceptedBloodRequests.map(
        (request) => {
          let distance = null;
          if (
            options.latitide &&
            options.longitude &&
            request.latitude &&
            request.longitude
          ) {
            distance = calculateDistance(
              { latitide: options.latitide, longitude: options.longitude },
              { latitide: request.latitude, longitude: request.longitude },
            );
          }

          delete request.latitude;
          delete request.longitude;

          return {
            ...request,
            distance,
          };
        },
      ),
    };
  }

  async acceptBloodDonationRequest(
    acceptedBloodRequestId: string,
    userId: string,
  ) {
    const acceptedBloodRequest =
      await this.acceptedBloodRequestRepository.findOne({
        where: {
          id: acceptedBloodRequestId,
        },
        select: {
          id: true,
          acceptedAccountId: true,
          bloodRequest: {
            id: true,
            // donationDate: true,
            address: true,
          },
        },
        relations: { bloodRequest: true },
      });

    if (!acceptedBloodRequest)
      throw new BadRequestException('Blood Request Not Found');

    // if (acceptedBloodRequest.bloodRequest.donationDate < new Date())
    // throw new BadRequestException('Can not accept expired request');

    acceptedBloodRequest.status = AcceptBloodRequestStatus.INVITED_BY_REQUESTER;

    await this.acceptedBloodRequestRepository.save(acceptedBloodRequest);

    this.notificationService.insertNotification(
      `
      You are invited to donate blood for the request you accepted earlier.
      location: ${acceptedBloodRequest.bloodRequest.address}
      `,
      acceptedBloodRequest.acceptedAccountId,
    );

    this.pushNotificationService.pushIndieNotification({
      title: 'Donation Invite Alert',
      message: `You are invited to donate blood for the request you accepted earlier.
      location: ${acceptedBloodRequest.bloodRequest.address}
      `,
      subId: acceptedBloodRequest.acceptedAccountId,
      pushData: {},
    });

    return {
      message: 'success',
    };
  }
}
