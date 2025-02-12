export default function Layout({
  children,
  ex1,
  ex2,
}: {
  children: React.ReactNode;
  ex1: React.ReactNode;
  ex2: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", height: "100%" }}>
      <div style={{ border: "1px solid magenta", width: "100px" }}>
        Layout text
      </div>
      <div style={{ border: "3px solid yellow", flexGrow: 1 }}>
        <div>{children}</div>
        <div>{ex1}</div>
        <div>{ex2}</div>
      </div>
    </div>
  );
}
