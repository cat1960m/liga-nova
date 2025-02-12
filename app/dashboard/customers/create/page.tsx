import { CreateCustomerForm1 } from "./_components/CreateCustomerForm1";
import { CreateCustomerForm } from "./_components/CreateCustomerForm";

const isNumber1 = false;

export default function CreateCustomerPage() {
  return (
    <>
      <div>Create Customer</div>
      {isNumber1 ? <CreateCustomerForm1 /> : <CreateCustomerForm />}
    </>
  );
}
