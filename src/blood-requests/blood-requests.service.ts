import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';
import { Repository } from 'typeorm';
import { BloodRequestDto } from './dto/blood-request.dto';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private readonly bloodRequestsRepository: Repository<BloodRequest>,
  ) {}

  async addBloodRequest(bloodRequestDto: BloodRequestDto) {
    if (new Date(bloodRequestDto.donationDate) > new Date())
      throw new HttpException(
        'donation date should not be in past',
        HttpStatus.BAD_REQUEST,
      );

    const newRequest = this.bloodRequestsRepository.create({
      ...bloodRequestDto,
    });

    await this.bloodRequestsRepository.save(newRequest);

    return {
      message: 'success',
    };
  }
}
