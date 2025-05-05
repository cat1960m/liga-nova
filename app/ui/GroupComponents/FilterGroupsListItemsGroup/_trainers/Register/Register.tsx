"use client";

import styles from "./register.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useActionState, useEffect } from "react";
import cn from "clsx";
import { registerFormAction, State } from "@/app/lib/utils/form_actions";

export type Props = {
  onClose: () => void;
  id: number;
};

export const Register = ({ onClose, id }: Props) => {
  const registerFormActionId0 = registerFormAction.bind(null, id);
  const registerFormActionId = registerFormActionId0.bind(null, "register");

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    registerFormActionId,
    initialState
  );

  useEffect(() => {
    if (!state.errors && !state.message) {
      onClose();
    }
  }, [state.errors, state.message]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.form}>
          <div className={styles.header}>
            <XMarkIcon width="24px" onClick={onClose} />
          </div>
          <form
            className={styles.formBody}
            action={formAction /*registerFormActionId*/}
          >
            <div className={styles.title}>Запис на тренування</div>
            <div className={styles.subTitle}>
              Саме персональний тренер є запорукою результату!
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Прізвище"
              name="firstName"
              required
              defaultValue={
                state?.defaultValues?.get("firstName")?.toString() ?? ""
              }
              aria-describedby="firstName-error"
            />
            <div id="firstName-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.firstName &&
                state.errors.firstName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <input
              className={styles.input}
              type="text"
              placeholder="Ім'я"
              name="lastName"
              required
              defaultValue={
                state?.defaultValues?.get("lastName")?.toString() ?? ""
              }
              aria-describedby="lastName-error"
            />

            <div id="lastName-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.lastName &&
                state.errors.lastName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <input
              className={styles.input}
              type="text"
              placeholder="Телефон"
              name="phone"
              required
              defaultValue={
                state?.defaultValues?.get("phone")?.toString() ?? ""
              }
              aria-describedby="phone-error"
            />
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.phone &&
                state.errors.phone.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              required
              defaultValue={
                state?.defaultValues?.get("email")?.toString() ?? ""
              }
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className={styles.text}>Оберіть дату і годину</div>

            <div className={styles.datePanel}>
              <input
                className={cn(styles.input, styles.dateTime)}
                type="text"
                placeholder="dd/mm/yyyy"
                name="date"
                required
                defaultValue={
                  state?.defaultValues?.get("date")?.toString() ?? ""
                }
                aria-describedby="date-error"
              />
              <div id="date-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.date &&
                  state.errors.date.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <input
                className={cn(styles.input, styles.dateTime)}
                type="text"
                placeholder="hh:00 or hh:30"
                name="time"
                required
                defaultValue={
                  state?.defaultValues?.get("time")?.toString() ?? ""
                }
                aria-describedby="time-error"
              />
              <div id="time-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.time &&
                  state.errors.time.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {state?.message ? <div className={styles.error}>{state.message}</div> : null}

            <button style={{ width: "100%" }} type="submit">
              Відправити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
