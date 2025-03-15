export const ShowSentence = ({ sentence }: { sentence: string }) => {
  return sentence.split(" ").map((word, index) => {
    return (
      <div style={{ display: "flex" }} key={index}>
        <div>{word}</div>
        <div style={{ width: "5px" }} />
      </div>
    );
  });
};
