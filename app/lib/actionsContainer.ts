"use server";

import axios from "axios";
import {
  addChildFeature,
  addIcon,
  addText,
  addTextDescription,
  getPageFullData,
  getPageTitles,
  getTextContents,
  RemoveFeature,
  RemoveTextDescription,
  revalidate,
  UpdateFeatureOrder,
  updateFeatureSubtypeFilterIds,
  updatePriceValueLink,
  updateText,
  UpdateTextDescriptionsOrder,
  updateTextDescriptionValue,
} from "./actions_fitness";
import { FullData, PageData, TextContent } from "./definitions";
import { revalidatePath } from "next/cache";

export const getPageData = async ({
  lang,
  pageName,
}: {
  lang: string;
  pageName: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const pageFullData: FullData[] | null = await getPageFullData({
      lang,
      pageName,
    });

    return pageFullData;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const url = `http://localhost:3001/pageData/${lang}/${pageName}`;
    const result = await axios.get<FullData[] | null>(url);

    return result.data;
  }

  return null;
};

export const getPageTitlesData = async (lang: string) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const pageTitles: PageData[] | null = await getPageTitles(lang);

    return pageTitles;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const result = await axios.get<PageData[]>(
      `http://localhost:3001/pageTitles/${lang}`
    );

    return result.data;
  }

  return null;
};

export const addIconData = async ({
  value,
  pathName,
}: {
  value: string;
  pathName: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const iconId = await addIcon({ value, pathName });

    return iconId;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const token = localStorage.get("authToken");
    const result = await axios.post(
      `http://localhost:3001/addIcon`,
      { value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    revalidatePath(pathName);

    return result.data;
  }

  return null;
};

export const addFeatureData = async (props: {
  type: string;
  parentId: number;
  subtype: string;
  name: string;
  text_types: string[];
  pathName?: string;
  filter_ids?: string | null;
  additionalPageName?: string | null;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const iconId = await addChildFeature(props);

    return iconId;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, ...body } = props;
    const result = await axios.post(`http://localhost:3001/addFeature`, body);

    if (pathName) {
      revalidatePath(pathName);
    }

    return result.data.newFeatureId;
  }

  return null;
};

export const removeFeatureData = async (props: {
  id: number;
  pathName?: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await RemoveFeature(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, id } = props;
    await axios.delete(`http://localhost:3001/removeFeature/${id}`);

    if (pathName) {
      revalidatePath(pathName);
    }
  }

  return null;
};

export const addTextDescriptionData = async (props: {
  featureId: number;
  textType: string;
  pathName?: string;
  canDelete: boolean;
  price: number | null;
  value?: string | null;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const iconId = await addTextDescription(props);

    return iconId;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, ...body } = props;
    const result = await axios.post(
      `http://localhost:3001/addTextDescription`,
      body
    );

    if (pathName) {
      revalidatePath(pathName);
    }

    return result.data.newId;
  }

  return null;
};

export const removeTextDescriptionData = async (props: {
  id: number;
  pathName: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await RemoveTextDescription(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, id } = props;
    await axios.delete(`http://localhost:3001/removeTextDescription/${id}`);

    revalidatePath(pathName);
  }

  return null;
};

export const addTextData = async (props: {
  lang: string;
  textDescriptionId: number;
  text: string | null;
  pathName?: string;
  contentType: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const textId = await addText(props);

    return textId;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, ...body } = props;
    const result = await axios.post(`http://localhost:3001/addText`, body);

    if (pathName) {
      revalidatePath(pathName);
    }

    return result.data.newId;
  }

  return null;
};

export const updateTextData = async (props: {
  id: number;
  text: string | null;
  contentType?: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await updateText(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    await axios.put(`http://localhost:3001/updateText`, props);
  }

  return null;
};

export const getTextContentsData = async ({
  text_description_id,
}: {
  text_description_id: number;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    const data = await getTextContents({ text_description_id });

    return data;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const result = await axios.get<TextContent[]>(
      `http://localhost:3001/textContents/${text_description_id}`
    );

    return result.data;
  }

  return null;
};

export const updatePriceValueLinkData = async (props: {
  textDescriptionId: number;
  price?: number | null;
  value?: string | null;
  link?: string | null;
  pathName?: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await updatePriceValueLink(props);

    return;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    await axios.put(`http://localhost:3001/updatePriceValueLink`, props);

    if (props.pathName) {
      revalidate(props.pathName);
    }

    return;
  }
};

export const updateFeatureSubtypeFilterIdsData = async (props: {
  id: number;
  subtype: string;
  pathName?: string;
  filterIds: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await updateFeatureSubtypeFilterIds(props);

    return;
  }

  if (process.env.DATABASE_MODE === "mysql") {
    await axios.put(`http://localhost:3001/updateSubtypeFilterIds`, props);

    if (props.pathName) {
      revalidate(props.pathName);
    }

    return;
  }
};

export const updateTextDescriptionValueData = async (props: {
  textDescriptionId: number;
  value: string;
  pathName: string;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await updateTextDescriptionValue(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    const { pathName, ...body } = props;
    await axios.put(`http://localhost:3001/updateTextDescriptionValue`, body);

    revalidatePath(pathName);
  }
};

export const updateFeatureOrderData = async (props: {
  id: number;
  order: number;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await UpdateFeatureOrder(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    await axios.put(`http://localhost:3001/updateFeatureOrder`, props);

    console.log("=========text updateFeatureOrder", props);
  }
};

export const updateTextDescriptionsOrderData = async (props: {
  id: number;
  order: number;
}) => {
  if (process.env.DATABASE_MODE === "postgres") {
    await UpdateTextDescriptionsOrder(props);
  }

  if (process.env.DATABASE_MODE === "mysql") {
    await axios.put(`http://localhost:3001/updateTextDescriptionsOrder`, props);

    console.log("=========updateTextDescriptionsOrder", props);
  }
};
