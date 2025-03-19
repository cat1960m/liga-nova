import { NextResponse } from "next/server";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export async function POST(req: Request) {
  const { s3Key } = await req.json();

  if (s3Key) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
      Key: s3Key,
    };

    try {
      const command = new DeleteObjectCommand(params);
      const response = await s3Client.send(command);
      console.log("-------------deleted " + s3Key);
      return NextResponse.json({ result: "OK" });
    } catch (error) {
      return NextResponse.json({ status: 500, error });
    }
  }
}
