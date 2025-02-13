import { Customer } from "@/app/lib/definitions";
import postgres from "postgres";
import Image from "next/image";
import styles from "./styles.module.css";
import { EditCustomerName } from "./EditCustomerName";
import { redirect } from "next/navigation";
import { RemoveCustomerButton } from "./RemoveCustomerButton";
import { AddCustomerButton } from "./AddCustomerButton";

export const CustomersServer = async ({
  customers: customersPromise,
}: {
  customers: Promise<postgres.RowList<Customer[]> | null>;
}) => {
  const customers = await customersPromise;

  if (!customers) {
    return <p>Customers Page error</p>;
  }

  if (!customers) {
    return <p>Customers Page error</p>;
  }

  return (
    <div>
      <p>Customers Page!!!</p>
      <AddCustomerButton />

      <table>
        <thead>
          <tr>
            <th>image</th>
            <th className={styles.headerColumn2}>name</th>
            <th>email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers?.map(({ id, name, email, image_url }) => {
            return (
              <tr key={id}>
                <td>
                  {image_url ? (
                    <Image
                      src={image_url}
                      alt="...image"
                      width="40"
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      paddingRight: "20px",
                    }}
                  >
                    <p>{`${name}`}</p>

                    <EditCustomerName name={name} id={id} />
                  </div>
                </td>

                <td>
                  <p>{`${email}`}</p>
                </td>

                <td>
                  <RemoveCustomerButton id={id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
