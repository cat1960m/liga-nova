import Responsive from "../images/_components/Imag1";
import Fill from "../images/_components/Imag2";

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  return (
    <div style={{ minHeight: "500px", height: "500px" }}>
      {posts?.length}
      {/*  {Ico()} */}
      <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Responsive />
      </div>
      <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Fill />
      </div>
      {/*  <div style={{ border: "1px solid magenta", backgroundColor: "cyan" }}>
        <Cover />
      </div> */}
    </div>
  ); // Add to Cart
}
