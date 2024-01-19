import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';
import { Repository } from 'typeorm';
import { BloodRequestDto } from './dto/blood-request.dto';
import { User } from '../users/entities/user.entity';
import { NOTFOUND } from 'dns';
import { AcceptBloodRequestDto } from './dto/accept-blood-request.dto';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private readonly bloodRequestsRepository: Repository<BloodRequest>,
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
    return await this.bloodRequestsRepository.find({
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

    return bloodRequest;
  }

  async acceptBloodRequest(acceptBloodRequestDto: AcceptBloodRequestDto) {
    return acceptBloodRequestDto;
  }
}
