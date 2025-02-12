import { useFormStatus } from "react-dom";
import { State } from "@/app/lib/actions_customers";
import { useState } from "react";

export const ImageForm = ({
  changeImage,
  state,
}: {
  changeImage?: (val: string) => void;
  state: State;
}) => {
  const [imageValue, setImageValue] = useState("");

  const handleClick = (num: number) => {
    if (num === 1) {
      setImageValue("/customers/amy-burns.png");
    }

    if (num === 2) {
      setImageValue("/customers/balazs-orban.png");
    }
  };

  return (
    <>
      <input hidden name="image_url" value={imageValue} onChange={() => {}} />
      <div aria-describedby="image_area">
        {imageValue}

        <div style={{ display: "flex" }}>
          <div
            style={{
              border: " 2px solid magenta",
              borderRadius: "10px",
              width: "20px",
              height: "20px",
            }}
            onClick={() => handleClick(1)}
          />

          <div
            style={{
              border: " 2px solid blue",
              borderRadius: "10px",
              width: "20px",
              height: "20px",
            }}
            onClick={() => handleClick(2)}
          />
        </div>
      </div>
      <div id="image_area" aria-live="polite" aria-atomic="true">
        {state.errors?.image_url &&
          state.errors.image_url.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </>
  );
};
