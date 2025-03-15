import { NextResponse } from "next/server";
import axios from "axios";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(req: Request) {
  const { fileName, fileType, s3Key } = await req.json();

  if (s3Key) {
    console.log("_________s3Key", s3Key);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
      Key: s3Key,
    };

    //await s3.deleteObject(params).promise();
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Error deleting object:", err);
      } else {
        console.log("Object deleted successfully:", data);
      }
    });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  const signedUrl = await s3.getSignedUrlPromise("putObject", params);

  console.log("signedUrl", signedUrl);
  return NextResponse.json({ signedUrl });
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

  await s3.upload(params, (err: any, data: any) => {
    if (err) {
      console.error("Error uploading file:", err);
      error = err;

      // return NextResponse.json({ error: "S3 failed" }, { status: 500 });
    } else {
      console.log("------File uploaded successfully:", data.Location);
      result = data.Location;
      //  return NextResponse.json({ data: data.Location });
    }
  });

  if (error) {
    return NextResponse.json({ error: "S3 failed" }, { status: 500 });
  } else {
    console.log("======File uploaded successfully:", result);
    return NextResponse.json({ result });
  }
}
