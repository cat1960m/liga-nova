"use server";

import postgres from "postgres";
import { Feature, PageData } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getPageTitles = async (lang: string) => {
  try {
    return await sql<PageData[]>`SELECT a.id, c.text_content, a.subtype, a.name
               FROM features a, textgroups b, contenttexts c 
               WHERE a.id = b.feature_id 
               AND b.id = c.text_group_id 
               AND a.type = 'page' 
               AND b.text_group_name ='title'
               AND c.language = ${lang}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
