import { Inject, Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import { abi, bytecode } from './contrats.lib';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Injectable()
export class ContractService {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor(
    @Inject('SIGNER') signer: ethers.Wallet,
    @Inject('PROVIDER') provider: ethers.providers.JsonRpcProvider,
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
  ) {
    this.signer = signer;
    this.provider = provider;
  }

  async deployCourseCertificationContract(
    courseName: string,
    courseSymbol = 'ZKA',
  ): Promise<ethers.Contract> {
    const factory = new ethers.ContractFactory(abi, bytecode, this.signer);

    console.log(
      this.configuration.contracts.publicAddress,
      courseName,
      courseSymbol,
    );

    const gasPrice = (await this.provider.getGasPrice()).mul(120).div(100);

    const contract = await factory.deploy(
      this.configuration.contracts.publicAddress,
      courseName,
      courseSymbol,
      {
        gasLimit: BigNumber.from('6000000'),
        gasPrice: gasPrice,
      },
    );

    await contract.deployed();
    await contract.deployTransaction.wait(2);
    return contract;
  }
}
