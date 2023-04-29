import { useAppContext } from "../context/AppContext";
import WordCard from "../components/WordCard";

function Words() {
  const { words } = useAppContext();

  return (
    <div className="space-y-4">
      {words &&
        words.map((word, index) => {
          return <WordCard key={index} word={word} />;
        })}
    </div>
  );
}
export default Words;
