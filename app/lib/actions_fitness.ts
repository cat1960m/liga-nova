"use server";

import postgres from "postgres";
import {
  PageData,
  FeatureChild,
  TextDescription,
  TextContent,
} from "./definitions";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getPageTitles = async (lang: string) => {
  try {
    return await sql<PageData[]>`SELECT a.id, c.text_content, a.subtype, a.name
               FROM features a, text_descriptions b, text_contents c 
               WHERE a.id = b.feature_id 
               AND b.id = c.text_description_id 
               AND a.type = 'page' 
               AND b.text_type ='title'
               AND c.language = ${lang}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

/* export const getPageGroups = async ({
  pageId,
  featureType,
  featureChildType,
}: {
  pageId: number;
  featureType: string;
  featureChildType: string;
}) => {
  try {
    return await sql<
      FeatureChildWithText[]
    >`SELECT  c.id, c.text_content, a.subtype, c.language, c.text_description_id
               FROM features a, text_descriptions b, text_contents c 
               WHERE a.id = b.feature_id   
               AND b.id = c.text_description_id 
               AND a.type = ${featureType}
               AND a.parent_feature_id=${pageId}
               AND b.text_type =${featureChildType}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
 */

/* export const getFeatureChildrenWithLanguageText = async ({
  featureId,
  language,
}: {
  featureId: number;
  language: string;
}) => {
  try {
    return await sql<
      FeatureChildText[]
    >`SELECT  c.id, c.text_content, c.language, c.text_description_id,
               a.subtype, a.type, a.name,
               b.feature_id, b.text_type, b.can_delete, b_Price
               FROM features a, text_descriptions b, text_contents c 
               WHERE a.id = b.feature_id 
               AND b.id = c.text_description_id 
               AND c.language = ${language}
               AND a.parent_feature_id=${featureId}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
}; */

export const getChildren = async ({
  parentFeatureId,
}: {
  parentFeatureId: number;
}) => {
  try {
    return await sql<FeatureChild[]>`SELECT
               a.subtype, a.type, a.name, a.id
               FROM features a
               WHERE a.parent_feature_id=${parentFeatureId}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

/* export const addFeatureGroup = async ({
  type,
  parentId,
  subtype,
  name,
  lang,
  text_type,
  text,
  pathName,
}: {
  type: string;
  parentId: number;
  text: string;
  price?: number;
  subtype: string;
  name: string;
  lang: string;
  text_type: string;
  pathName: string;
}) => {
  try {
    const newFeatures = await sql`
          INSERT INTO features (parent_feature_id, type, subtype, name)
          VALUES (${parentId}, ${type}, ${subtype}, ${name})
          RETURNING id;
        `;

    const newFeatureId = newFeatures[0]?.id;

    if (newFeatureId) {
      console.log("newId", newFeatureId);

      const newFeatureChildren = await sql`
          INSERT INTO text_descriptions (feature_id, text_type)
          VALUES (${newFeatureId}, ${text_type})
          RETURNING id;
        `;

      const newFEatureChildId = newFeatureChildren[0]?.id;

      if (newFEatureChildId) {
        const newTextContent = await sql`
          INSERT INTO text_contents (text_description_id, language, text_content)
          VALUES (${newFEatureChildId}, ${lang}, ${text})
        `;
      }
      revalidatePath(pathName);
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
 */

export const updateText = async ({
  lang,
  id,
  text,
  pathName,
}: {
  lang: string;
  id: number;
  text: string;
  pathName: string;
}) => {
  try {
    await sql`Update  text_contents
               SET  text_content = ${text}
               WHERE id = ${id}
               AND language = ${lang}`;
    revalidatePath(pathName);
    return;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const RemoveFeature = async ({
  id,
  pathName,
}: {
  id: number;
  pathName?: string;
}) => {
  try {
    await sql`DELETE  FROM features
               WHERE features.id = ${id}`;
    if (pathName) {
      revalidatePath(pathName);
    }
    return true;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const addText = async ({
  lang,
  textDescriptionId,
  text,
  pathName,
}: {
  lang: string;
  textDescriptionId: number;
  text: string;
  pathName: string;
}) => {
  try {
    const newTextContent = await sql`
          INSERT INTO text_contents (text_description_id, language, text_content)
          VALUES (${textDescriptionId}, ${lang}, ${text})
        `;
    revalidatePath(pathName);
    return;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const addFeatureGroup = async ({
  type,
  parentId,
  subtype,
  name,
  text_types,
  pathName,
}: {
  type: string;
  parentId: number;
  subtype: string;
  name: string;
  text_types: string[];
  pathName: string;
}) => {
  try {
    const newFeatures = await sql`
          INSERT INTO features (parent_feature_id, type, subtype, name)
          VALUES (${parentId}, ${type}, ${subtype}, ${name})
          RETURNING id;
        `;

    const newFeatureId = newFeatures[0]?.id;

    if (newFeatureId) {
      console.log("newId", newFeatureId);

      const promises: any[] = [];

      text_types.forEach((textType) => {
        promises.push(sql`
          INSERT INTO text_descriptions (feature_id, text_type)
          VALUES (${newFeatureId}, ${textType})
          RETURNING id;
        `);
      });

      await Promise.all(promises);

      revalidatePath(pathName);
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getFeatureChildTexts = async ({
  text_description_id,
}: {
  text_description_id: number;
}) => {
  try {
    return await sql<TextContent[]>`SELECT
               *
               FROM text_contents c
               WHERE c.text_description_id = ${text_description_id}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getTextDescriptions = async ({
  featureChildId,
}: {
  featureChildId: number;
}) => {
  try {
    return await sql<TextDescription[]>`SELECT
               *
               FROM text_descriptions b
               WHERE b.feature_id = ${featureChildId}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
