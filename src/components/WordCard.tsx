import { IWord } from "../context/AppContext";

interface WordCardProps {
  word: IWord;
}

function WordCard({ word }: WordCardProps) {
  return (
    <div>
      <p>{word["word"]}</p>
      <p>{word["wordGB"]}</p>
    </div>
  );
}
export default WordCard;
