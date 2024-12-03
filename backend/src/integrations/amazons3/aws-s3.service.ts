import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;
 
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(bucket: string, key: string, body: Buffer, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async uploadBase64(folder: string, key: string, base64Data: string): Promise<string> {
    // Decode the Base64 Data URL
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid Base64 Data URL');
    }

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    const bucket = this.configService.get('AWS_BUCKET');
    const subfolder = this.configService.get('AWS_SUB_BUCKET')+"/"+folder;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: `${subfolder}/${key}`,
      Body: buffer,
      ContentType: contentType,
      //ACL: 'public-read',
    });

    await this.s3Client.send(command);
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${subfolder}/${key}`;
  }
}