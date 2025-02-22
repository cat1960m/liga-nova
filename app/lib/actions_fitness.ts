"use server";

import postgres from "postgres";
import {
  PageData,
  Feature,
  TextDescription,
  TextContent,
  FullData,
} from "./definitions";
import { revalidatePath } from "next/cache";
import {
  CAN_NOT_DELETE,
  SERVICE_ITEM,
  TAB,
  TAB_TITLE,
  TABS,
} from "./constants";

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

export const getFeatureChildren = async ({
  parentFeatureId,
}: {
  parentFeatureId: number;
}) => {
  try {
    return await sql<Feature[]>`SELECT
               *
               FROM features
               WHERE features.parent_feature_id=${parentFeatureId}`;
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
  id,
  text,
  pathName,
  contentType,
}: {
  id: number;
  text: string | null;
  pathName: string;
  contentType: string;
}) => {
  try {
    await sql`Update  text_contents
               SET  text_content = ${text}
               WHERE id = ${id}`;
    revalidatePath(pathName);
    return;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const updatePrice = async ({
  price,
  textDescriptionId,
  pathName,
}: {
  textDescriptionId: number;
  price: number;
  pathName: string;
}) => {
  try {
    await sql`Update  text_descriptions
               SET  price = ${price}
               WHERE id = ${textDescriptionId}`;

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

export const RemoveTextDescription = async ({
  id,
  pathName,
}: {
  id: number;
  pathName?: string;
}) => {
  try {
    await sql`DELETE  FROM text_descriptions
               WHERE text_descriptions.id = ${id}`;
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
  contentType,
}: {
  lang: string;
  textDescriptionId: number;
  text: string | null;
  pathName: string;
  contentType: string;
}) => {
  try {
    const newTextContent =
      await sql`INSERT INTO text_contents (text_description_id, language, text_content, content_type)
          VALUES (${textDescriptionId}, ${lang}, ${text}, ${contentType})
          RETURNING id;`;

    revalidatePath(pathName);
    return newTextContent;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const addChildFeature = async ({
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
}): Promise<number | null> => {
  try {
    const newFeatures = await sql`
          INSERT INTO features (parent_feature_id, type, subtype, name)
          VALUES (${parentId}, ${type}, ${subtype}, ${name})
          RETURNING id;
        `;

    const newFeatureId: number = newFeatures[0]?.id;

    if (newFeatureId) {
      const promises: any[] = [];

      text_types.forEach((textType) => {
        const price = textType === SERVICE_ITEM ? 0 : null;
        const can_delete = !CAN_NOT_DELETE.includes(textType);

        promises.push(sql`
          INSERT INTO text_descriptions (feature_id, text_type, price, can_delete)
          VALUES (${newFeatureId}, ${textType}, ${price}, ${can_delete})
          RETURNING id;`);
      });

      await Promise.all(promises);

      revalidatePath(pathName);

      return newFeatureId;
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
  return null;
};

export const addTextDescription = async ({
  featureId,
  textType,
  pathName,
  canDelete,
  price,
}: {
  featureId: number;
  textType: string;
  pathName: string;
  canDelete: boolean;
  price: number | null;
}) => {
  const result =
    await sql`INSERT INTO text_descriptions (feature_id, text_type, can_delete, price)
          VALUES (${featureId}, ${textType}, ${canDelete}, ${price})
          RETURNING id;`;
  revalidatePath(pathName);
};

export const getTextContents = async ({
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
  featureId,
}: {
  featureId: number;
}) => {
  try {
    return await sql<TextDescription[]>`SELECT
               *
               FROM text_descriptions b
               WHERE b.feature_id = ${featureId}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getTabsTitles = async ({
  tabsFeatureId,
}: {
  tabsFeatureId: number;
}) => {
  const text_type = TAB_TITLE;
  try {
    return await sql<TextDescription[]>`SELECT
               b.id, b.feature_id,b.text_type, b.price, b.can_delete
               FROM text_descriptions b, features a
               WHERE b.feature_id = a.id
               AND a.parent_feature_id = ${tabsFeatureId}
               AND b.text_type = ${text_type};`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getFullData = async ({ lang }: { lang: string }) => {
  try {
    return await sql<FullData[]>`Select features.id, 
        parent_feature_id, type, subtype, name, 
        text_type, price,  text_content , content_type, language from features left join text_descriptions 
        on features.id = text_descriptions.feature_id 
        left join text_contents on text_descriptions.id = text_contents.text_description_id 
        and text_contents.language = ${lang};`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
