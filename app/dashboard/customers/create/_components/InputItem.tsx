import { State } from "@/app/lib/actions_customers";

export const InputItem = ({ state }: { state: State }) => {
  return (
    <div>
      <p> Name:</p>
      <div>
        <input
          name="name"
          aria-label="Name"
          aria-describedby="name_area"
          defaultValue={state?.lastData?.get("name")?.toString() ?? undefined}
          style={{
            borderColor: state.errors?.name ? "red" : "black",
            height: "32px",
          }}
          required
        />
      </div>
      <div id="name_area" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
};
