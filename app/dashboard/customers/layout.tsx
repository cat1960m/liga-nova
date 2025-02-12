export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="parentModal" style={{ position: "relative", overflow: "auto" }}>
      {children}
    </div>
  );
}
