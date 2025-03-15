import { NextResponse } from "next/server";
import axios from "axios";

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
    console.log("_________s3Key", s3Key);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
      Key: s3Key,
    };

    try {
      const command = new DeleteObjectCommand(params);
      const response = await s3Client.send(command);
      console.log("Delete response:", response);
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

    console.log("signedUrl", signedUrl);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function POST1(req: Request) {
  console.log("---fileName");
  const { fileName, fileType, fileContent } = await req.json();
  console.log("---fileName", fileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
    Key: fileName, // File name in the bucket
    Body: fileContent, // File data
    ACL: "public-read", // Optional: make the file public
  };

  let error = "";
  let result = "999";

  if (error) {
    return NextResponse.json({ error: "S3 failed" }, { status: 500 });
  } else {
    console.log("======File uploaded successfully:", result);
    return NextResponse.json({ result });
  }
}
