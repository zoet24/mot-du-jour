import { useAppContext, IWord } from "../context/AppContext";
import WordCard from "../components/WordCard";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Words() {
  const { loading, words } = useAppContext();

  useEffect(() => {
    console.log("Hello");
    toast.info("Edit and delete words by clicking on the card", {
      autoClose: 5000,
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4 w-full">
          {words.length > 0 ? (
            words.map((word: IWord, index: number) => {
              const wordRefStr = word.wordRefStr;
              return (
                <WordCard key={index} word={word} wordRefStr={wordRefStr} />
              );
            })
          ) : (
            <p className="text-center">Please add some words!</p>
          )}
        </div>
      )}
    </>
  );
}
export default Words;
