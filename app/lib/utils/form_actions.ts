"use server";

import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
const phoneRegex =
  /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    date?: string[];
    time?: string[];
  };
  message?: string | null;
  defaultValues?: FormData;
};

const FormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  date: z.string().refine(
    (value) => {
      const [day, month, year] = value.split("/");
      const parsedDate = new Date(`${year}-${month}-${day}`);
      return (
        parsedDate.getUTCFullYear() == +year &&
        parsedDate.getUTCMonth() + 1 == +month &&
        parsedDate.getUTCDate() ==
          +day /* || parsedDate.getDate() + 1 == +day */
      );
    },
    { message: "Invalid date or format (dd/mm/yyyy)" }
  ),
  time: z.string().refine(
    (value) => {
      const [hours, minutes] = value.split(":");
      const h = +hours;
      const m = +minutes;
      return 0 <= h && h < 24 && (m === 0 || m === 30);
    },
    { message: "Invalid time or format hh:00 or hh/30" }
  ),
});

export const registerFormAction = async (
  id: number,
  type: string,
  prevState: State,
  formData: FormData
) => {
  const validatedFields = FormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    date: formData.get("date"),
    time: formData.get("time"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
      defaultValues: formData,
    };
  }

  const { firstName, lastName, phone, email, date, time } =
    validatedFields.data;
  console.log("formData", firstName, lastName, phone, email, date, time);
  console.log("id", id);
  console.log("type", type);

  try {
    await sql`
            INSERT INTO request (first_name, last_name, phone, email, date, time, trainerid, type)
            VALUES (${firstName}, ${lastName}, ${phone}, ${email}, ${date}, ${time}, ${id}, ${type});`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message:
        "Database Error: Failed to write request. " + "  " + error?.toString(),
    };
  }

  return {};
};
