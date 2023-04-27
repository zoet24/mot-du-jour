import { useAppContext } from "../context/AppContext";
import WordCard from "../components/WordCard";

function Words() {
  const { words } = useAppContext();

  return (
    <>
      {words &&
        words.map((word, index) => {
          return <WordCard key={index} word={word} />;
        })}
    </>
  );
}
export default Words;
