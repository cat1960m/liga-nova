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
import { CAN_NOT_DELETE, SERVICE_ITEM, TAB_TITLE } from "./constants";

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

export const updateFeatureSubtypeFilterIds = async ({
  id,
  subtype,
  pathName,
  filterIds,
}: {
  id: number;
  subtype: string;
  pathName: string;
  filterIds: string;
}) => {
  try {
    await sql`Update  features
               SET  subtype = ${subtype}, filter_ids= ${filterIds}
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

    // revalidatePath(pathName);
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
               WHERE features.id = ${id} OR features.parent_feature_id =${id}`;
    if (pathName) {
      revalidatePath(pathName);
    }
    return true;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const RemoveFeatureBySubtype = async ({
  subtype,
  pathName,
}: {
  subtype: string;
  pathName?: string;
}) => {
  try {
    await sql`DELETE  FROM features
               WHERE features.subtype = ${subtype}`;
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

    // revalidatePath(pathName);
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
  const date = new Date();
  let time = date.getTime();
  try {
    const newFeatures = await sql`
          INSERT INTO features (parent_feature_id, type, subtype, name, feature_order)
          VALUES (${parentId}, ${type}, ${subtype}, ${name}, ${time})
          RETURNING id;
        `;

    const newFeatureId: number = newFeatures[0]?.id;

    if (newFeatureId) {
      const promises: any[] = [];

      text_types.forEach((textType) => {
        const price = textType === SERVICE_ITEM ? 0 : null;
        const can_delete = !CAN_NOT_DELETE.includes(textType);
        time++;

        promises.push(sql`
          INSERT INTO text_descriptions (feature_id, text_type, price, can_delete, text_description_order)
          VALUES (${newFeatureId}, ${textType}, ${price}, ${can_delete}, ${time})
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
  const date = new Date();
  const time = date.getTime();

  const result =
    await sql`INSERT INTO text_descriptions (feature_id, text_type, can_delete, price, text_description_order)
          VALUES (${featureId}, ${textType}, ${canDelete}, ${price}, ${time})
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

/* export const getFullData = async ({
  lang,
  parentId,
}: {
  lang: string;
  parentId: number;
}) => {
  try {
    return await sql<FullData[]>`SELECT features.id, 
        parent_feature_id, text_descriptions.id as text_description_id, text_contents.id  as text_content_id
        type, subtype, name, 
        text_type, price,  text_content , content_type, language 
        FROM features 
        LEFT JOIN text_descriptions 
        ON features.id = text_descriptions.feature_id 
        LEFT JOIN text_contents 
        ON text_descriptions.id = text_contents.text_description_id 
        WHERE  (parent_feature_id=${parentId} OR parent_feature_id in 
        (select id from features where features.parent_feature_id = ${parentId} and features.type='tabs'))
        AND (language = ${lang} or language is null)`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
}; */

export const getPageFullData = async ({
  lang,
  pageName,
  additionalName,
}: {
  lang: string;
  pageName: string;
  additionalName: string;
}) => {
  try {
    return await sql<FullData[]>`SELECT features.id, 
        parent_feature_id, text_descriptions.id as text_description_id,type, subtype, name, feature_order, filter_ids,
        text_type, price, can_delete,
        language, text_content, content_type
        FROM features 
        LEFT JOIN text_descriptions 
        ON features.id = text_descriptions.feature_id 
        LEFT JOIN text_contents 
        ON text_descriptions.id = text_contents.text_description_id 
        WHERE  (name = ${pageName} OR name = ${additionalName}) AND (language = ${lang} or language is null)
        ORDER BY feature_order, text_description_order`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const addFilterTextDescriptionIdsToFeatureId = async ({
  featureId,
  textDescriptionIds,
  pathName,
}: {
  featureId: number;
  textDescriptionIds: number[];
  pathName: string;
}) => {
  const promises: Promise<any>[] = [];

  textDescriptionIds.forEach((textDescriptionId) => {
    promises.push(
      sql`INSERT INTO filter_to_feature (text_description_id, feature_id) VALUES(${textDescriptionId}, ${featureId})`
    );
  });

  await Promise.all(promises);

  await revalidatePath(pathName);
};

//////

export const getAllFeatures = async () => {
  try {
    return await sql<Feature[]>`SELECT
               *
               FROM features  order by id`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const UpdateFeatureOrder = async ({
  id,
  order,
}: {
  id: number;
  order: number;
}) => {
  try {
    return await sql`Update  features
               SET  feature_order = ${order}
               WHERE id = ${id}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getAllTextDescription = async () => {
  try {
    return await sql<Feature[]>`SELECT
               *
               FROM text_descriptions  order by id`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const UpdateTextDescriptionsOrder = async ({
  id,
  order,
}: {
  id: number;
  order: number;
}) => {
  try {
    return await sql`Update  text_descriptions
               SET  text_description_order = ${order}
               WHERE id = ${id}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const revalidate = async (path: string) => {
  await revalidatePath(path);
};
