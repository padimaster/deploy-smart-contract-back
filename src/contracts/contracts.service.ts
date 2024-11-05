import { Inject, Injectable } from '@nestjs/common';
import {
  createWalletClient,
  http,
  formatEther,
  parseGwei,
  publicActions,
} from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { abi, bytecode } from './contrats.lib';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Injectable()
export class ContractService {
  private client: any;
  private account: any;

  constructor(
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
  ) {
    const privateKey =
      `0x${this.configuration.contracts.privateKey}` as `0x${string}`;
    this.account = privateKeyToAccount(privateKey);
    this.client = createWalletClient({
      account: this.account,
      chain: sepolia,
      transport: http(this.configuration.contracts.providerURL),
    }).extend(publicActions);
  }

  async deployCourseCertificationContract(
    courseName: string,
    courseSymbol = 'ZKA',
  ) {
    try {
      console.log('Starting contract deployment...');
      console.log('Using account address:', this.account.address);

      console.log('Deploy parameters:', {
        owner: this.configuration.contracts.publicAddress,
        courseName,
        courseSymbol,
      });

      // Get current gas price and add 20% buffer
      const gasPrice = await this.client.getGasPrice();
      const bufferedGasPrice = (gasPrice * 120n) / 100n;
      console.log(
        'Calculated gas price:',
        parseGwei(bufferedGasPrice.toString()),
        'gwei',
      );

      const balance = await this.client.getBalance({
        address: this.account.address,
      });
      console.log('Account balance:', formatEther(balance), 'ETH');

      console.log('Attempting to deploy contract...');
      const hash = await this.client.deployContract({
        abi,
        bytecode,
        args: [
          this.configuration.contracts.publicAddress,
          courseName,
          courseSymbol,
        ],
        account: this.account,
        gas: 3000000n,
        maxFeePerGas: bufferedGasPrice,
        maxPriorityFeePerGas: bufferedGasPrice / 2n,
      });

      console.log('Contract deployment transaction hash:', hash);
      console.log('Waiting for contract deployment...');

      const receipt = await this.client.waitForTransactionReceipt({
        hash,
        confirmations: 2,
      });

      console.log('Contract deployed at:', receipt.contractAddress);
      console.log('Contract deployment confirmed');

      return receipt.contractAddress;
    } catch (error) {
      console.error('Contract deployment failed with error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        transaction: error.transaction,
        receipt: error.receipt,
      });
      throw error;
    }
  }
}
