// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { StaticTexts } from "../dictionaries/definitions";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

//table in db features
export type Feature = {
  id: number;
  parent_feature_id: number;
  type: string;
  subtype: string;
  name: string;
  updated_by: number;
  last_edit: Date;
  additional_page_name?: string;
  feature_order: number;
};

//table in db text_descriptions
export type TextDescription = {
  id: number;
  feature_id: number;
  text_type: string;
  price?: number;
  can_delete?: boolean;
  text_description_order: number;
};

//table in db text_contents
export type TextContent = {
  id: number;
  text_description_id: number;
  language: string;
  text_content: string;
  updated_by: number;
  last_edit: Date;
  content_type?: string;
  value?: string;
};

export type TextDescriptionContent = TextContent & {
  text_type: string;
  price?: number;
  can_delete?: boolean;
};

/* export type FeatureChildWithText = {
  text_description_id: number;
  id: number;
  text_content: string;
  subtype: string;
  language: string;
}; */

/* export type FeatureChildExtended = {
  id: number;
  feature_id: number;
  text_type: string;
  can_delete?: boolean;
  price?: number;
  //from feature
  type: string;
  subtype: string;
  name: string;
}; */

/* export type FeatureChildText = {
  //from text_contents
  id: number;
  text_description_id: number;
  text_content: string;
  language: string;

  //from text_descriptions
  feature_id: number;
  text_type: string;
  can_delete?: boolean;
  price?: number;
  //from features
  type: string;
  subtype: string;
  name: string;
}; */

export type PageData = {
  id: number;
  text_content: string;
  subtype: string;
  name: string;
};

export type TabType = {
  langUpperCase: string;
  value: string;
};

export type PageParams = {
  pageName: string;
  lang: string;
};


export type MainParams = {
  pageName: string;
  lang: string;
  staticTexts: StaticTexts;
  editMode: string ;
};

export type FullData = {
  id: number;
  parent_feature_id: number;
  text_description_id: number;
  text_content_id: number;
  text_description_order: number;
  type: string;
  subtype: string;
  name: string;
  additional_page_name?: string;
  text_type: string;
  can_delete?: boolean;
  price?: number;
  value?: string;
  link?: string;
  text_content?: string;
  content_type?: string;
  language?: string;
  feature_order: number;
  filter_ids?: string;
};

export type GroupDefinition = {
  groupFeatureSubtype: string;
  childFeatureSubtype: string | null;
  textTypes: string[];
};

export type FilterGroupEditMode = "no" | "groupItems" | "groupOnly";
