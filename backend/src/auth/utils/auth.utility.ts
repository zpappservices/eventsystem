import { createHash, randomBytes } from 'crypto';

export class Utility {
  static async generateRandomNumber(n: number) {
    return (
      Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) +
      Math.pow(10, n - 1)
    );
  }

  static async createHashToken(randomstring: string) {
    var hashString = createHash('sha256').update(randomstring).digest('hex');

    return hashString;
  }

  static async createResetToken() {
    const resetToken = randomBytes(32).toString('hex');

    const hashedToken = createHash('sha256').update(resetToken).digest('hex');

    return { resetToken, hashedToken };
  }
}
