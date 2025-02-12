import Image from "next/image";
import lee_robinson from "public/customers/lee-robinson.png";
import delba from "public/customers/delba-de-oliveira.png";
import amy from "public/customers/amy-burns.png";

export default function Fill() {
  return (
    <div
      style={{
        display: "grid",
        gridGap: "8px",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, auto))",
      }}
    >
      <div style={{ position: "relative", height: "400px" }}>
        <Image
          alt="Mountains"
          src={lee_robinson}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
      <div style={{ position: "relative", height: "400px" }}>
        <Image
          alt="Mountains"
          src={delba}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
      <div style={{ position: "relative", height: "400px" }}>
        <Image
          alt="Mountains"
          src={amy}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>

      {/* And more images in the grid... */}
    </div>
  );
}
