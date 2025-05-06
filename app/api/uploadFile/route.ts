import { NextResponse } from "next/server";

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export async function POST(req: Request) {
  const { fileName, fileType, s3Key } = await req.json();

  if (s3Key) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
      Key: s3Key,
    };

    try {
      const command = new DeleteObjectCommand(params);
      const response = await s3Client.send(command);
      console.log("========upload Delete response:", response);
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    ACL: ObjectCannedACL.public_read,
  };

  try {
    // Create the command for uploading
    const command = new PutObjectCommand(params);

    // Generate pre-signed URL (valid for 1 hour)
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
