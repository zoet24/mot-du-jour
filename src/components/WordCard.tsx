import { IWord } from "../context/AppContext";

interface WordCardProps {
  word: IWord;
}

function WordCard({ word }: WordCardProps) {
  return (
    <div className="w-full bg-white border-green border-2 rounded-lg overflow-hidden shadow-card">
      <div className="p-4 bg-green">
        <p className="capitalise text-white">{word["word"]}</p>
      </div>
      <div className="p-4">
        <p className="capitalise">{word["wordGB"]}</p>
      </div>
    </div>
  );
}
export default WordCard;
