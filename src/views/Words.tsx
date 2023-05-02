import { useAppContext } from "../context/AppContext";
import WordCard from "../components/WordCard";
import Loading from "../components/Loading";

function Words() {
  const { loading, words } = useAppContext();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4 w-full">
          {words &&
            words.map((word, index) => {
              return <WordCard key={index} word={word} />;
            })}
        </div>
      )}
    </>
  );
}
export default Words;
