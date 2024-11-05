import { Inject, Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import { courseCertificationContract } from './contrats.lib';
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
    const { abi, deployedBytecode } = courseCertificationContract;
    const factory = new ethers.ContractFactory(
      abi,
      deployedBytecode,
      this.signer,
    );
    console.log(
      this.configuration.contracts.publicAddess,
      courseName,
      courseSymbol,
    );

    const contract = await factory.deploy(
      this.configuration.contracts.publicAddess,
      courseName,
      courseSymbol,
      {
        gasLimit: BigNumber.from('1500000'),
        nonce: await this.provider.getTransactionCount(this.signer.address),
      },
    );

    console.log('contract', contract.address);
    console.log('contract', contract.deployTransaction);

    await contract.deployed();
    return contract;
  }
}
