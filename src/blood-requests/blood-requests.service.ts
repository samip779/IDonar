import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';
import { Repository } from 'typeorm';
import { BloodRequestDto } from './dto/blood-request.dto';
import { User } from '../users/entities/user.entity';
import { NOTFOUND } from 'dns';
import { AcceptBloodRequestDto } from './dto/accept-blood-request.dto';
import { getCompatibleBloodGroups } from '../helpers/compatibility';
import { AcceptedBloodRequest } from './entities/accepted-blood-request.entity';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private readonly bloodRequestsRepository: Repository<BloodRequest>,

    @InjectRepository(AcceptedBloodRequest)
    private readonly acceptedBloodRequestRepository: Repository<AcceptedBloodRequest>,
  ) {}

  async addBloodRequest(bloodRequestDto: BloodRequestDto, requester: User) {
    if (new Date(bloodRequestDto.donationDate) < new Date())
      throw new HttpException(
        'donation date should not be in past',
        HttpStatus.BAD_REQUEST,
      );

    const newRequest = this.bloodRequestsRepository.create({
      ...bloodRequestDto,
      requesterId: requester.id,
    });

    await this.bloodRequestsRepository.save(newRequest);

    return {
      message: 'success',
    };
  }

  async getBloodRequests() {
    const requests = await this.bloodRequestsRepository.find({
      select: {
        id: true,
        patientGender: true,
        patientAge: true,
        bloodGroup: true,
        donationDate: true,
        contactNumber: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
      order: {
        donationDate: 'ASC',
      },
    });

    return requests.map((request) => {
      return {
        ...request,
        compatibleDonors: getCompatibleBloodGroups(request.bloodGroup),
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
        donationDate: true,
        contactNumber: true,
        address: true,
        createdAt: true,
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

    // check if the user has already requested to donate for the same blood request
    const isAlreadyRequested =
      await this.acceptedBloodRequestRepository.findOne({
        where: { acceptedAccountId: user.id, bloodRequestId: bloodRequest.id },
        select: ['id'],
      });

    if (isAlreadyRequested)
      throw new HttpException('already requested', HttpStatus.BAD_REQUEST);

    // finally add donation request to db
    const acceptBloodRequest = this.acceptedBloodRequestRepository.create({
      ...acceptBloodRequestDto,
      acceptedAccountId: user.id,
      requesterId: bloodRequest.requesterId,
    });

    await this.acceptedBloodRequestRepository.save(acceptBloodRequest);

    return acceptBloodRequest;
  }
}
