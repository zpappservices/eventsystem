import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

export const uploadFilesToS3 = async (files) => {
  if (!files || files.length === 0) return [];

  const array = [];

  try {
    const uploadPromises = files.map(async (file) => {
      const fileToUpload = file instanceof File ? file : file?.file;
      if (!fileToUpload) return null;

      const fileBuffer = await fileToUpload.arrayBuffer();

      const fileName = `images/${Date.now()}-${fileToUpload.name.replace(
        /\s+/g,
        "-"
      )}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: Buffer.from(fileBuffer),
        ContentType: fileToUpload.type,
        mode: "no-cors",
      });

      const response = await s3Client.send(command);

      if (response.$metadata.httpStatusCode === 200) {
        array.push(
          `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`
        );

        return `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
      }
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null
    );
    return uploadedUrls;
  } catch (error) {
    throw error;
  }
};

/* const uploaded = await uploadFilesToS3([file]);
const photoUrl = uploaded?.[0]; */
