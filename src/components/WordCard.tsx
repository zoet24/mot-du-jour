import { IWord } from "../context/AppContext";

interface WordCardProps {
  word: IWord;
}

function WordCard({ word }: WordCardProps) {
  return (
    <div className="w-full border-black border-2 rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-200">
        <p>{word["word"]}</p>
      </div>
      <div className="p-4">
        <p>{word["wordGB"]}</p>
      </div>
    </div>
  );
}
export default WordCard;
