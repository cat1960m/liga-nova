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
import { CAN_NOT_DELETE, ICON, SERVICE_ITEM, TAB_TITLE } from "./constants";

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
  type,
  subtype,
}: {
  parentFeatureId: number;
  type: string;
  subtype: string;
}) => {
  try {
    const dd = await sql<Feature[]>`SELECT
    *
    FROM features
    WHERE features.id=${parentFeatureId}`;

    const isPage = !dd[0].parent_feature_id;

    if (isPage) {
      return await sql<Feature[]>`SELECT
               *
               FROM features
               WHERE features.parent_feature_id=${parentFeatureId} 
               ORDER BY feature_order`;
    }

    return await sql<Feature[]>`SELECT
               *
               FROM features
               WHERE features.parent_feature_id=${parentFeatureId} 
               AND features.type=${type} AND features.subtype=${subtype}
               ORDER BY feature_order`;
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

export const updatePriceValueLink = async ({
  textDescriptionId,
  pathName,
  price = null,
  value = null,
  link = null,
}: {
  textDescriptionId: number;
  price?: number | null;
  value?: string | null;
  link?: string | null;
  pathName: string;
}) => {
  try {
    await sql`Update  text_descriptions
               SET  price = ${price}, value=${value}, link=${link}
               WHERE id = ${textDescriptionId}`;

    revalidatePath(pathName);
    return;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const updateTextDescriptionValue = async ({
  value,
  textDescriptionId,
  pathName,
}: {
  textDescriptionId: number;
  value: string;
  pathName: string;
}) => {
  try {
    await sql`Update  text_descriptions
               SET  value = ${value}
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
  let ids: number[] = [id];

  try {
    await sql`DELETE  FROM features WHERE features.id = ${id} `;

    while (true) {
      if (!ids.length) {
        break;
      }

      const children: FullData[] = await sql<FullData[]>`SELECT *
        FROM features
        WHERE parent_feature_id = ANY (${sql.array(ids)}::integer[]);`;

      if (children.length) {
        ids = children.map((child) => child.id);

        await sql`
            DELETE FROM features
            WHERE id = ANY (${sql.array(ids)}::integer[]);
          `;
      } else {
        ids = [];
      }
    }

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
  pathName: string;
}) => {
  try {
    await sql`DELETE  FROM text_descriptions
               WHERE text_descriptions.id = ${id}`;
    revalidatePath(pathName);
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

export const updateText = async ({
  id,
  text,
  pathName,
  contentType,
}: {
  id: number;
  text: string | null;
  pathName: string;
  contentType?: string;
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

export const addChildFeature = async ({
  type,
  parentId,
  subtype,
  name,
  text_types,
  pathName,
  filter_ids = null,
  additionalPageName = null,
}: {
  type: string;
  parentId: number;
  subtype: string;
  name: string;
  text_types: string[];
  pathName: string;
  filter_ids?: string | null;
  additionalPageName?: string | null;
}): Promise<number | null> => {
  const date = new Date();
  let time = date.getTime();
  try {
    const newFeatures = await sql`
          INSERT INTO features (parent_feature_id, type, subtype, name, feature_order, filter_ids, additional_page_name)
          VALUES (${parentId}, ${type}, ${subtype}, ${name}, ${time}, ${filter_ids}, ${additionalPageName})
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
  value = null,
}: {
  featureId: number;
  textType: string;
  pathName: string;
  canDelete: boolean;
  price: number | null;
  value?: string | null;
}) => {
  try {
    const date = new Date();
    const time = date.getTime();
    const result =
      await sql`INSERT INTO text_descriptions (feature_id, text_type, can_delete, price, text_description_order, value)
          VALUES (${featureId}, ${textType}, ${canDelete}, ${price}, ${time}, ${value})
          RETURNING id;`;

    const newTextDEscriptionId: number = result[0]?.id;
    revalidatePath(pathName);

    return newTextDEscriptionId;
  } catch (error) {
    return null;
  }
  return null;
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
  textType,
}: {
  featureId: number;
  textType: string;
}) => {
  try {
    return await sql<TextDescription[]>`SELECT
               *
               FROM text_descriptions b
               WHERE b.feature_id = ${featureId} AND b.text_type =${textType}
               ORDER BY b.text_description_order`;
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

export const getPageFullDataOld = async ({
  lang,
  pageName,
}: {
  lang: string;
  pageName: string;
}) => {
  //ANY (${sql.array(ids)}::integer[])
  try {
    return await sql<FullData[]>`SELECT features.id, 
        parent_feature_id, type, subtype, name, feature_order, filter_ids, additional_page_name,
        text_descriptions.id as text_description_id, text_type, price, can_delete, value, link,text_description_order,
        language, text_content, content_type
        FROM features 
        LEFT JOIN text_descriptions 
        ON features.id = text_descriptions.feature_id 
        LEFT JOIN text_contents 
        ON text_descriptions.id = text_contents.text_description_id 
        WHERE  (name = ${pageName} OR 
        name = (SELECT additional_page_name FROM features WHERE name=${pageName} AND type='page')) 
        AND (language = ${lang} or language is null)
        ORDER BY feature_order, text_description_order`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const getPageFullData = async ({
  lang,
  pageName,
}: {
  lang: string;
  pageName: string;
}) => {
  type StrAdd = {
    additional_page_name: string | null;
  };
  try {
    const additionalPageNames = await sql<
      StrAdd[]
    >`SELECT additional_page_name FROM features WHERE name=${pageName} AND type='page'`;
    const names: string[] =
      additionalPageNames[0]?.additional_page_name?.split(",") ?? [];

    return await sql<FullData[]>`SELECT features.id, 
        parent_feature_id, type, subtype, name, feature_order, filter_ids, additional_page_name,
        text_descriptions.id as text_description_id, text_type, price, can_delete, value, link,
        language, text_content, content_type
        FROM features 
        LEFT JOIN text_descriptions 
        ON features.id = text_descriptions.feature_id 
        LEFT JOIN text_contents 
        ON text_descriptions.id = text_contents.text_description_id 
        WHERE  (name = ${pageName} OR name = ANY (${sql.array(names)})) 
        AND (language = ${lang} or language is null)
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

export const addIcon = async ({
  value,
  pathName,
}: {
  value: string;
  pathName: string;
}): Promise<number | null> => {
  const date = new Date();
  let time = date.getTime();
  const name = ICON;

  try {
    const newFeatures = await sql`
          INSERT INTO features ( name, feature_order)
          VALUES ( ${name}, ${time})
          RETURNING id;
        `;

    const newFeatureId: number = newFeatures[0]?.id;

    if (newFeatureId) {
      await sql`
          INSERT INTO text_descriptions (feature_id, value, text_type, text_description_order)
          VALUES (${newFeatureId}, ${value}, ${name}, ${time})
          RETURNING id;`;

      revalidatePath(pathName);

      return newFeatureId;
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
  return null;
};
