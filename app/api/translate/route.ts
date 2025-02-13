import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();
  const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      null,
      {
        params: {
          auth_key: DEEPL_API_KEY,
          text,
          target_lang: targetLang,
        },
      }
    );

    const translatedText = response.data.translations[0].text;
    return NextResponse.json({ translatedText });
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
