"use server";

import postgres from "postgres";
import { Customer } from "./definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: "Please enter a name.",
    })
    .min(1),
  email: z.string({ invalid_type_error: "Please enter email" }).min(1),
  image_url: z.string(),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true, image_url: true });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getCustomers = async () => {
  try {
    return await sql<Customer[]>`select * from customers`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export async function createCustomer1(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create customer.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email } = validatedFields.data;

  const image_url = ``;

  // Insert data into the database
  try {
    await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create customer.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}
