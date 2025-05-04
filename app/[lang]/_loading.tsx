const Loading = () => {
  return (
    <div
      style={{
        color: "cyan",
        fontWeight: 700,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1075,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        Main page loading ...
      </div>
    </div>
  );
};

export default Loading;
