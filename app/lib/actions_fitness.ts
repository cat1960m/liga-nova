"use server";

import postgres from "postgres";
import {
  PageData,
  TextContent,
  FullData,
  Feature,
  TextDescription,
  History,
  HistoryActionType,
} from "./definitions";
import { revalidatePath } from "next/cache";
import {
  ADD,
  CAN_NOT_DELETE,
  DELETE,
  FEATURES,
  ICON,
  SERVICE_ITEM,
  TEXT_DESCRIPTIONS,
  UPDATE,
} from "./constants";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
type Id = {
  id: number;
};

//get
export const getPageTitles = async (lang: string) => {
  try {
    return await sql<PageData[]>`SELECT a.id, c.text_content, a.subtype, a.name
               FROM features a, text_descriptions b, text_contents c 
               WHERE a.id = b.feature_id 
               AND b.id = c.text_description_id 
               AND a.type = 'page' 
               AND b.text_type ='title'
               AND c.language = ${lang}`;
  } catch {
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
        text_descriptions.id as text_description_id, text_type, price, can_delete, value, link,text_description_order,
        language, text_content, content_type
        FROM features 
        LEFT JOIN text_descriptions 
        ON features.id = text_descriptions.feature_id 
        LEFT JOIN text_contents 
        ON text_descriptions.id = text_contents.text_description_id 
        WHERE  (name = ${pageName} OR name = ANY (${sql.array(names)})) 
        AND (language = ${lang} or language is null)
        ORDER BY feature_order, text_description_order`;
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
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
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

//update

export const updateFeatureSubtypeFilterIds = async ({
  id,
  subtype,
  pathName,
  filterIds,
}: {
  id: number;
  subtype: string;
  pathName?: string;
  filterIds: string;
}) => {
  try {
    await sql`Update  features
               SET  subtype = ${subtype}, filter_ids= ${filterIds}
               WHERE id = ${id}`;

    if (pathName) {
      revalidatePath(pathName);
    }
    return;
  } catch {
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
  pathName?: string;
}) => {
  try {
    await sql`Update  text_descriptions
               SET  price = ${price}, value=${value}, link=${link}
               WHERE id = ${textDescriptionId}`;
    if (pathName) {
      revalidatePath(pathName);
    }
    return;
  } catch {
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
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export const updateText = async ({
  id,
  text,
  pathName,
}: {
  id: number;
  text: string | null;
  pathName?: string;
  contentType?: string;
}) => {
  try {
    await sql`Update  text_contents
               SET  text_content = ${text}
               WHERE id = ${id}`;
    if (pathName) {
      revalidatePath(pathName);
    }
    return;
  } catch {
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
    await sql`Update  features
               SET  feature_order = ${order}
               WHERE id = ${id}`;
  } catch {
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
    await sql`Update  text_descriptions
               SET  text_description_order = ${order}
               WHERE id = ${id}`;
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
};
//remove
const removeItemWithChildrenFromFeatureTable = async ({
  id,
  tableName,
}: {
  id: number;
  tableName: "features" | "features_history";
}) => {
  let ids: number[] = [id];
  await sql`DELETE  FROM ${sql.unsafe(tableName)} WHERE id = ${id} `;

  while (true) {
    if (!ids.length) {
      break;
    }

    const children: Id[] = await sql<Id[]>`SELECT id
        FROM ${sql.unsafe(tableName)}
        WHERE parent_feature_id = ANY (${sql.array(ids)}::integer[]);`;

    if (children.length) {
      ids = children.map((child) => child.id);

      await sql`
            DELETE FROM ${sql.unsafe(tableName)}
            WHERE id = ANY (${sql.array(ids)}::integer[]);
          `;
    } else {
      ids = [];
    }
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
    await removeItemWithChildrenFromFeatureTable({ id, tableName: FEATURES });

    if (pathName) {
      revalidatePath(pathName);
    }

    return true;
  } catch {
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
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

//add
export const addText = async ({
  lang,
  textDescriptionId,
  text,
  contentType,
  pathName,
}: {
  lang: string;
  textDescriptionId: number;
  text: string | null;
  pathName?: string;
  contentType: string;
}) => {
  try {
    const newTextContent =
      await sql`INSERT INTO text_contents (text_description_id, language, text_content, content_type)
          VALUES (${textDescriptionId}, ${lang}, ${text}, ${contentType})
          RETURNING id;`;
    if (pathName) {
      revalidatePath(pathName);
    }
    return newTextContent;
  } catch {
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
  pathName?: string;
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

    if (!newFeatureId) {
      throw Error("error in create feature newFeatureId=NULL");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];

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

    if (pathName) {
      revalidatePath(pathName);
    }

    return newFeatureId;
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
  return null;
};

export const addTextDescription = async ({
  featureId,
  textType,
  canDelete,
  price,
  value = null,
  pathName,
}: {
  featureId: number;
  textType: string;
  pathName?: string;
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

    const newTextDescriptionId: number = result[0]?.id;

    if (pathName) {
      revalidatePath(pathName);
    }

    if (!newTextDescriptionId) {
      throw Error("error in addTextDescription newTextDescriptionId=NULL");
    }

    return newTextDescriptionId;
  } catch {
    return null;
  }
};

export const addIcon = async ({
  value,
  pathName,
}: {
  value: string;
  pathName: string;
}): Promise<number | null> => {
  const date = new Date();
  const time = date.getTime();
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
  } catch {
    // If a database error occurs, return a more specific error.
    return null;
  }
  return null;
};

export const revalidate = async (path: string) => {
  await revalidatePath(path);
};

////////////////////////////////////////////
//Undo

// copy feature to  history

export const copyFeatureToFromHistory = async ({
  featureFromId,
  parentFeatureId,
  isToHistory,
  action,
  onlyFeature = false,
}: {
  featureFromId: number;
  parentFeatureId: number | null;
  isToHistory: boolean;
  action: HistoryActionType;
  onlyFeature?: boolean;
}): Promise<number | null> => {
  let newFeatureToId: number | null = null;
  const tableFeaturesFrom = isToHistory ? FEATURES : "features_history";
  const tableFeaturesTo = !isToHistory ? FEATURES : "features_history";
  const tableTextDescriptionFrom = isToHistory
    ? TEXT_DESCRIPTIONS
    : "text_descriptions_history";

  try {
    const features: Feature[] = await sql<Feature[]>`SELECT
               *
               FROM ${sql.unsafe(tableFeaturesFrom)} f
               WHERE f.id = ${featureFromId}`;

    const feature: Feature | undefined = features?.[0];
    if (!feature) {
      throw Error("no feature with id=" + featureFromId);
    }

    const newFeatures = await sql`INSERT INTO 
      ${sql.unsafe(tableFeaturesTo)} 
      (parent_feature_id, type, subtype, name, updated_by, last_edit, feature_order, filter_ids, additional_page_name)
              VALUES (
              ${parentFeatureId || null},
              ${feature?.type ?? null}, 
              ${feature?.subtype ?? null}, 
              ${feature?.name}, 
              ${feature?.updated_by ?? null},
              ${feature?.last_edit ?? null},
              ${feature?.feature_order ?? null}, 
              ${feature?.filter_ids ?? null}, 
              ${feature?.additional_page_name ?? null})
              RETURNING id;`;

    newFeatureToId = newFeatures[0]?.id;

    if (!newFeatureToId) {
      throw Error("new feature was not created");
    }

    if (onlyFeature) {
      return newFeatureToId;
    }

    const textDescriptionsIds: Id[] = await sql<Id[]>`SELECT
               t.id
               FROM ${sql.unsafe(tableTextDescriptionFrom)} t
               WHERE t.feature_id = ${featureFromId}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promisesTD: Promise<any>[] = [];
    textDescriptionsIds.forEach((textDescriptionFromId) => {
      promisesTD.push(
        copyTextDescriptionToFromHistory({
          textDescriptionFromId: textDescriptionFromId.id,
          isToHistory,
          featureIdTo: newFeatureToId,
          action,
        })
      );
    });
    await Promise.all(promisesTD);

    if (action === UPDATE) {
      return newFeatureToId;
    }

    const children: Id[] = await sql<Id[]>`SELECT
               f.id
               FROM  ${sql.unsafe(tableFeaturesFrom)} f
               WHERE f.parent_feature_id = ${featureFromId}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promisesF: Promise<any>[] = [];
    children.forEach((childFeatureId) => {
      promisesF.push(
        copyFeatureToFromHistory({
          featureFromId: childFeatureId.id,
          parentFeatureId: newFeatureToId,
          isToHistory,
          action,
        })
      );
    });
    await Promise.all(promisesF);

    if (action !== DELETE) {
      return newFeatureToId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promisesH: Promise<any>[] = [];
    if (isToHistory) {
      // If some data were referred to idFrom as parent (that will be deleted),
      // add reference to history_table_deleted_parent_id (until it will be restored)
      promisesH.push(
        sql`
          UPDATE history
          SET history_table_deleted_parent_id = ${newFeatureToId},
              table_parent_id = NULL
          WHERE table_parent_id = ${featureFromId}
            AND (table_name = 'features' OR table_name = 'text_descriptions')
        `
      );

      promisesH.push(
        sql`
          UPDATE history
          SET history_table_deleted_id = ${newFeatureToId},
              table_id = NULL
          WHERE table_id = ${featureFromId}
            AND table_name = 'features'
        `
      );
    } else {
      // If some data were referred to history.history_table_id as history_table_deleted_parent_id,
      // change referral to newFeatureId as table_parent_id
      promisesH.push(
        sql`
          UPDATE history
          SET table_parent_id = ${newFeatureToId},
              history_table_deleted_parent_id = NULL
          WHERE history_table_deleted_parent_id = ${featureFromId}
            AND (table_name = 'features' OR table_name = 'text_descriptions')
        `
      );

      promisesH.push(
        sql`
          UPDATE history
          SET table_id = ${newFeatureToId},
              history_table_deleted_id = NULL
          WHERE history_table_deleted_id = ${featureFromId}
            AND table_name = 'features'
        `
      );
    }

    await Promise.all(promisesH);

    return newFeatureToId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

const copyTextDescriptionToFromHistory = async ({
  textDescriptionFromId,
  isToHistory,
  featureIdTo,
  action,
}: {
  textDescriptionFromId: number;
  isToHistory: boolean;
  featureIdTo: number | null;
  action: HistoryActionType;
}): Promise<number | null> => {
  const tableTextDescriptionFrom = isToHistory
    ? TEXT_DESCRIPTIONS
    : "text_descriptions_history";

  const tableTextDescriptionTo = !isToHistory
    ? TEXT_DESCRIPTIONS
    : "text_descriptions_history";
  const tableTextContentFrom = isToHistory
    ? "text_contents"
    : "text_contents_history";

  let newTextDescriptionIdTo: number | null = null;

  try {
    const textDescriptionsFrom: TextDescription[] = await sql<
      TextDescription[]
    >`SELECT
               *
               FROM ${sql.unsafe(tableTextDescriptionFrom)} t
               WHERE t.id = ${textDescriptionFromId}`;

    if (!textDescriptionsFrom.length) {
      throw Error(
        "copyTextDescriptionToHistory no textDescription with id= " +
          textDescriptionFromId
      );
    }
    const textDescriptionFrom = textDescriptionsFrom[0];

    const newTextDescriptionToIds = await sql`
          INSERT INTO ${sql.unsafe(
            tableTextDescriptionTo
          )} (feature_id, text_type, price, can_delete, text_description_order, value, link)
          VALUES (
          ${featureIdTo}, 
          ${textDescriptionFrom.text_type}, 
          ${textDescriptionFrom.price ?? null}, 
          ${textDescriptionFrom.can_delete ?? null}, 
          ${textDescriptionFrom.text_description_order ?? null},
          ${textDescriptionFrom.value ?? null},
          ${textDescriptionFrom.link ?? null})
          RETURNING id;`;
    newTextDescriptionIdTo = newTextDescriptionToIds[0]?.id;

    if (!newTextDescriptionIdTo) {
      throw Error("new newTextDescriptionToId is not created");
    }

    const textContentIdsFrom: Id[] = await sql<Id[]>`SELECT
               t.id
               FROM ${sql.unsafe(tableTextContentFrom)} t
               WHERE t.text_description_id = ${textDescriptionFromId}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promisesTC: Promise<any>[] = [];
    textContentIdsFrom.forEach((textContentIdFrom) => {
      promisesTC.push(
        copyTextContentToFromHistory({
          textContentIdFrom: textContentIdFrom.id,
          isToHistory,
          textDescriptionIdTo: newTextDescriptionIdTo ?? undefined,
        })
      );
    });

    await Promise.all(promisesTC);

    if (action !== DELETE) {
      return newTextDescriptionIdTo;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promisesH: Promise<any>[] = [];

    if (isToHistory) {
      promisesH.push(
        sql`
          UPDATE history
          SET history_table_deleted_id = ${newTextDescriptionIdTo}
          WHERE table_id = ${textDescriptionFromId}
            AND table_name = 'text_descriptions'
        `
      );
    } else {
      promisesH.push(
        sql`
          UPDATE history
          SET table_id = ${newTextDescriptionIdTo},
              history_table_deleted_id = NULL
          WHERE history_table_deleted_id = ${textDescriptionFromId}
            AND table_name = 'text_descriptions'
        `
      );
    }

    await Promise.all(promisesH);

    return newTextDescriptionIdTo;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

const copyTextContentToFromHistory = async ({
  textContentIdFrom,
  isToHistory,
  textDescriptionIdTo,
}: {
  textContentIdFrom: number;
  isToHistory: boolean;
  textDescriptionIdTo?: number;
}) => {
  const tableTextContentFrom = isToHistory
    ? "text_contents"
    : "text_contents_history";
  const tableTextContentTo = !isToHistory
    ? "text_contents"
    : "text_contents_history";

  let newTextContentTo: number | null = null;

  try {
    const textContentsFrom: TextContent[] = await sql<
      TextContent[]
    >`SELECT * FROM ${sql.unsafe(tableTextContentFrom)} t
      WHERE t.id = ${textContentIdFrom}`;

    if (!textContentsFrom.length) {
      throw Error("no text_content with id=" + textContentIdFrom);
    }
    const textContentFrom: TextContent = textContentsFrom[0];

    const newTextContentsTo = await sql`INSERT INTO ${sql.unsafe(
      tableTextContentTo
    )} (text_description_id, language, text_content, content_type, last_edit_date, updated_by )
          VALUES (
          ${textDescriptionIdTo ?? null}, 
          ${textContentFrom.language ?? null}, 
          ${textContentFrom.text_content}, 
          ${textContentFrom.content_type ?? null},
          ${textContentFrom.last_edit_date},
          ${textContentFrom.updated_by ?? null})
        RETURNING id;`;

    newTextContentTo = newTextContentsTo[0]?.id;
    if (!newTextContentTo) {
      throw Error("copyTextContentToHistory - can not create new Text Content");
    }
    return newTextContentTo;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const addDeletingFeatureToHistory = async ({
  idFrom,
  idParentFrom,
  page,
}: {
  idFrom: number;
  idParentFrom: number;
  page: string;
}) => {
  try {
    const newFeatureIdHistory = await copyFeatureToFromHistory({
      featureFromId: idFrom,
      parentFeatureId: null, //idParentFrom,
      isToHistory: true,
      action: DELETE,
    });

    if (!newFeatureIdHistory) {
      throw Error(
        "error in copy feature to features_history with id=" + idFrom
      );
    }
    const tableName = FEATURES;

    const newHistoryIds = await sql`INSERT INTO history (
            table_name,table_parent_id,action_type,history_table_id, page, history_table_deleted_parent_id)
            VALUES ( 
              ${tableName}, 
              ${idParentFrom}, 
              'add', 
              ${newFeatureIdHistory}, 
              ${page},
              null
            )
            RETURNING id;`;

    const newHistoryId = newHistoryIds[0]?.id;
    return newHistoryId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const getCurrentHistory = async (
  page: string
): Promise<History | undefined> => {
  const histories: History[] = await sql<History[]>`
    SELECT *
    FROM history
    WHERE page = ${page}
    ORDER BY last_edit_date DESC
    LIMIT 1
    `;

  return histories?.length ? histories?.[0] : undefined;
};

export const revertDeletedFeatureFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, history_table_id, table_parent_id, table_name, action_type } =
    history;

  try {
    if (!history_table_id || table_name !== FEATURES || action_type !== ADD) {
      throw Error(
        "history.history_table_id is NULL in revert deleted feature action "
      );
    }

    const newFeatureId = await copyFeatureToFromHistory({
      featureFromId: history_table_id,
      parentFeatureId: table_parent_id ?? null,
      isToHistory: false,
      action: DELETE,
    });

    await removeItemWithChildrenFromFeatureTable({
      id: history_table_id,
      tableName: "features_history",
    });

    await sql`DELETE FROM history WHERE id=${id}`;
    return newFeatureId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const addDeletingTextDescriptionToHistory = async ({
  textDescriptionFromId,
  idParentFrom,
  page,
}: {
  textDescriptionFromId: number;
  idParentFrom: number;
  page: string;
}) => {
  try {
    const newTextDescriptionIdTo = await copyTextDescriptionToFromHistory({
      textDescriptionFromId: textDescriptionFromId,
      featureIdTo: null, //idParentFrom,
      isToHistory: true,
      action: DELETE,
    });

    if (!newTextDescriptionIdTo) {
      throw Error(
        "error in copy text_description to text_descriptions_history with id=" +
          textDescriptionFromId
      );
    }
    const tableName = TEXT_DESCRIPTIONS;

    const newHistoryIds = await sql`INSERT INTO history (
            table_name,table_parent_id,action_type,history_table_id, page, history_table_deleted_parent_id)
            VALUES ( 
              ${tableName}, 
              ${idParentFrom}, 
              'add', 
              ${newTextDescriptionIdTo}, 
              ${page},
              null
            )
            RETURNING id;`;

    const newHistoryId = newHistoryIds[0]?.id;
    return newHistoryId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const revertDeletedTextDescriptionFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, history_table_id, table_parent_id, table_name, action_type } =
    history;

  try {
    if (
      !history_table_id ||
      table_name !== TEXT_DESCRIPTIONS ||
      action_type !== ADD
    ) {
      throw Error(
        "history.history_table_id is NULL in revert deleted text description action "
      );
    }

    const newFeatureId = await copyTextDescriptionToFromHistory({
      textDescriptionFromId: history_table_id,
      featureIdTo: table_parent_id ?? null,
      isToHistory: false,
      action: DELETE,
    });

    await sql`DELETE  FROM text_descriptions_history
               WHERE id = ${history_table_id}`;

    await sql`DELETE FROM history WHERE id=${id}`;

    return newFeatureId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const revertAddedFeatureFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, table_id, table_name, action_type } = history;
  try {
    if (!table_id || table_name !== FEATURES || action_type !== DELETE) {
      throw Error("history.table_id is NULL");
    }

    await removeItemWithChildrenFromFeatureTable({
      id: table_id,
      tableName: FEATURES,
    });

    await sql`DELETE FROM history WHERE id=${id}`;

    return "OK";
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const revertAddedTextDescriptionFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, table_id, table_name, action_type } = history;

  try {
    if (
      !table_id ||
      table_name !== TEXT_DESCRIPTIONS ||
      action_type !== DELETE
    ) {
      throw Error("history.table_id is NULL");
    }

    await sql`DELETE FROM text_descriptions WHERE id=${table_id}`;

    await sql`DELETE FROM history WHERE id=${id}`;

    return "OK";
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const addAddedFeatureToHistory = async ({
  newFeatureId,
  pageName,
}: {
  newFeatureId: number;
  pageName: string;
}) => {
  await sql`INSERT INTO history (
                  table_name,table_id, table_parent_id, action_type, history_table_id, 
                  page, history_table_deleted_parent_id, history_table_deleted_id
                )
                VALUES ( 
                  'features', 
                  ${newFeatureId}, 
                  NULL,
                  'delete', 
                  NULL, 
                  ${pageName},
                  NULL,
                  NULL
                )
                RETURNING id;
            `;
};

export const addAddedTextDescriptionToHistory = async ({
  newTextDescriptionId,
  pageName,
}: {
  newTextDescriptionId: number;
  pageName: string;
}) => {
  await sql`INSERT INTO history (
                  table_name,table_id, table_parent_id, action_type, history_table_id, 
                  page, history_table_deleted_parent_id, history_table_deleted_id
                )
                VALUES ( 
                  'text_descriptions', 
                  ${newTextDescriptionId}, 
                  NULL,
                  'delete', 
                  NULL, 
                  ${pageName},
                  NULL,
                  NULL
                )
                RETURNING id;
            `;
};

export const addUpdatingFeatureToHistory = async ({
  idFrom,
  page,
}: {
  idFrom: number;
  page: string;
}) => {
  try {
    const newFeatureIdHistory = await copyFeatureToFromHistory({
      featureFromId: idFrom,
      parentFeatureId: null, //idParentFrom,
      isToHistory: true,
      action: UPDATE,
    });

    if (!newFeatureIdHistory) {
      throw Error(
        "error in copy feature to features_history with id=" + idFrom
      );
    }
    const tableName = FEATURES;

    const newHistoryIds = await sql`INSERT INTO history (
              table_name,table_id, table_parent_id,action_type,history_table_id, 
              page, history_table_deleted_parent_id)
            VALUES ( 
              ${tableName}, 
              ${idFrom},
              NULL,  
              'update', 
              ${newFeatureIdHistory}, 
              ${page},
              NULL
            )
            RETURNING id;`;

    const newHistoryId = newHistoryIds[0]?.id;
    return newHistoryId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

const revertUpdatedTextDescription = async ({
  textDescriptionId,
  textDescriptionHistory,
}: {
  textDescriptionId: number;
  textDescriptionHistory: TextDescription;
}) => {
  const textContents: TextContent[] =
    await sql`SELECT * from text_contents WHERE 
    text_description_id = ${textDescriptionId}`;

  const textContentsHistory: TextContent[] =
    await sql`SELECT * from text_contents_history WHERE 
    text_description_id = ${textDescriptionHistory.id}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: Promise<any>[] = [];
  promises.push(
    updatePriceValueLink({
      textDescriptionId: textDescriptionId,
      price: textDescriptionHistory.price,
      value: textDescriptionHistory.value,
      link: textDescriptionHistory.link,
    })
  );
  if (!textContentsHistory.length) {
    textContents.forEach((item) => {
      promises.push(updateText({ id: item.id, text: "" }));
    });
  } else {
    textContentsHistory.forEach((itemHistory) => {
      const itemMain = textContents.find(
        (item) =>
          item.language === itemHistory.language &&
          item.content_type === itemHistory.content_type
      );

      if (itemMain) {
        promises.push(
          updateText({ id: itemMain.id, text: itemHistory.text_content })
        );
      }
    });
  }

  await Promise.all(promises);
};

export const revertUpdatedFeatureFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, table_id, table_name, action_type, history_table_id } = history;
  try {
    if (
      !table_id ||
      table_name !== FEATURES ||
      action_type !== UPDATE ||
      !history_table_id
    ) {
      throw Error("error = incorrect data");
    }

    const features: Feature[] = await sql`
      SELECT * FROM features_history WHERE id = ${history_table_id}
    `;

    if (!features.length) {
      throw Error("features.length = 0");
    }

    const feature = features[0];

    await updateFeatureSubtypeFilterIds({
      id: table_id,
      subtype: feature.subtype ?? "",
      filterIds: feature.filter_ids ?? "",
    });

    const textDescriptionsHistory: TextDescription[] = await sql`
      SELECT * FROM text_descriptions_history WHERE feature_id = ${feature.id}
    `;

    const textDescriptions: TextDescription[] = !textDescriptionsHistory.length
      ? []
      : await sql`
      SELECT * FROM text_descriptions WHERE feature_id = ${table_id}
    `;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];

    textDescriptionsHistory.forEach((itemHistory) => {
      const itemMain = textDescriptions.find(
        (item) => item.text_type === itemHistory.text_type
      );

      if (itemMain) {
        promises.push(
          revertUpdatedTextDescription({
            textDescriptionId: itemMain.id,
            textDescriptionHistory: itemHistory,
          })
        );
      }
    });

    await Promise.all(promises);

    await removeItemWithChildrenFromFeatureTable({
      id: history_table_id,
      tableName: "features_history",
    });

    await sql`DELETE FROM history WHERE id=${id}`;

    return "OK";
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const addUpdatingTextDescriptionToHistory = async ({
  idFrom,
  page,
}: {
  idFrom: number;
  page: string;
}) => {
  try {
    const newTextDescriptionIdHistory = await copyTextDescriptionToFromHistory({
      textDescriptionFromId: idFrom,
      featureIdTo: null, //idParentFrom,
      isToHistory: true,
      action: UPDATE,
    });

    if (!newTextDescriptionIdHistory) {
      throw Error(
        "error in copy feature to features_history with id=" + idFrom
      );
    }
    const tableName = TEXT_DESCRIPTIONS;

    const newHistoryIds = await sql`INSERT INTO history (
              table_name,table_id, table_parent_id,action_type,history_table_id, 
              page, history_table_deleted_parent_id)
            VALUES ( 
              ${tableName}, 
              ${idFrom},
              NULL,  
              'update', 
              ${newTextDescriptionIdHistory}, 
              ${page},
              NULL
            )
            RETURNING id;`;

    const newHistoryId = newHistoryIds[0]?.id;
    return newHistoryId;
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const revertUpdatedTextDescriptionFromHistory = async ({
  history,
}: {
  history: History;
}) => {
  const { id, table_id, table_name, action_type, history_table_id } = history;
  try {
    if (
      !table_id ||
      table_name !== TEXT_DESCRIPTIONS ||
      action_type !== UPDATE ||
      !history_table_id
    ) {
      throw Error("incorrect data");
    }

    const textDescriptionsHistory: TextDescription[] = await sql`
      SELECT * FROM text_descriptions_history WHERE id = ${history_table_id}
    `;

    const textDescriptions: TextDescription[] = !textDescriptionsHistory.length
      ? []
      : await sql`
      SELECT * FROM text_descriptions WHERE id = ${table_id}
    `;

    if (!textDescriptionsHistory?.length || !textDescriptions?.length) {
      throw Error("error data");
    }

    await revertUpdatedTextDescription({
      textDescriptionId: textDescriptions[0].id,
      textDescriptionHistory: textDescriptionsHistory[0],
    });

    await sql`DELETE FROM text_descriptions_history WHERE id=${history_table_id}`;

    await sql`DELETE FROM history WHERE id=${id}`;

    return "OK";
  } catch (error) {
    console.log("error", error?.toString());
    return null;
  }
};

export const clearHistory = async () => {
  try {
    await sql`DELETE FROM history`;
    await sql`DELETE FROM features_history`;
    await sql`DELETE FROM text_descriptions_history`;
  } catch (error) {
    console.log("error", error?.toString());
  }
};
