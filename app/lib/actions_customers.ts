"use server";

import postgres from "postgres";
import { Customer } from "./definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
  lastData?: FormData;
};

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: "Please enter a name.",
    })
    .min(1),
  email: z.string({ invalid_type_error: "Please enter email" }).min(1),
  image_url: z.string({ invalid_type_error: "Please enter image" }).min(1),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getCustomers = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    return await sql<Customer[]>`select * from customers`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return null;
  }
};

export async function createCustomer1(prevState: State, formData: FormData) {
  //throw new Error("Failed to fetch user.");

  console.log("-------formData", formData);

  // Validate form using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image_url: formData.get("image_url"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create customer.",
      lastData: formData,
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data;

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
      lastData: formData,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers_old");
}

export async function removeCustomer(customerId: string) {
  try {
    await sql`
        DELETE FROM customers WHERE id = ${customerId.toString()}
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to remove customer.",
    };
  }
  revalidatePath("/dashboard/customers");
}
