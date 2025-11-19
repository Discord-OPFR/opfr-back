import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

@Injectable()
export class CryptoService {
  private readonly key: Buffer;
  constructor(private readonly configService: ConfigService) {
    this.key = Buffer.from(
      this.configService.get<string>('ENCRYPT_KEY')!,
      'hex',
    );
  }

  encrypt(token: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(token, 'utf-8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return {
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      value: encrypted.toString('hex'),
    };
  }

  decrypt(payload: { iv: string; authTag: string; value: string }) {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.key,
      Buffer.from(payload.iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(payload.authTag, 'hex'));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(payload.value, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
