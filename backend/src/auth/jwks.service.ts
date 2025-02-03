import { Injectable, OnModuleInit } from '@nestjs/common';
import * as jose from 'node-jose';

@Injectable()
export class JwksService implements OnModuleInit {
  private keystore: any; 
  private key: any;

  async onModuleInit() {
    this.keystore = jose.JWK.createKeyStore();
    this.key = await this.keystore.generate('RSA', 2048, {
      alg: 'RS256',
      use: 'sig',
    });
  }

  async getPublicJwks() {
    return this.keystore.toJSON(true);
  }

  getSigningKey() {
    return this.key;
  }
}