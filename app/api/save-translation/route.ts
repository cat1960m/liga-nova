import { NextResponse } from "next/server";

import postgres from "postgres";
//import { sql } from '@vercel/postgres'; // Adjust if using a different Postgres client

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const { translatedText } = await req.json();

  const email = "example@e.com";
  const image_url = "";

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
        VALUES (${translatedText}, ${email}, ${image_url})
    `;
    return NextResponse.json({ message: "Translation saved successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save translation" },
      { status: 500 }
    );
  }
}
