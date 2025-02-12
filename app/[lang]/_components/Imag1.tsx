import Image from "next/image";
import mountains from "public/hero-mobile.png";

export default function Responsive() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Image
        alt="Mountains"
        // Importing an image will
        // automatically set the width and height
        src={mountains}
        sizes="100vw"
        // Make the image display full width
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
