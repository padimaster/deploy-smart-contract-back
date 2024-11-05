import { Body, Controller, Post } from '@nestjs/common';
import { ContractService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractService) {}

  @Post('deploy')
  async createContract(
    @Body() contractCreation: { name: string; symbol: string },
  ) {
    const { name, symbol } = contractCreation;

    const response =
      await this.contractsService.deployCourseCertificationContract(
        name,
        symbol,
      );

    console.log(response);

    return response;
  }
}
