import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwksService } from './jwks.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private jwksService: JwksService,
  ) {}

  async login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      const payload = { username, sub: '1' };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }
}