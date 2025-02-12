import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <div>Layout ex1</div>
      <div style={{ border: "3px solid yellow", flexGrow: 1 }}>
        <div>
          <Link href={"/example/extended"}>extended</Link>
          <Link href={"/example/inner"}>inner</Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
