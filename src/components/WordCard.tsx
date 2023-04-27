import { IWord } from "../context/AppContext";

interface WordCardProps {
  word: IWord;
}

function WordCard({ word }: WordCardProps) {
  return (
    <div>
      {word["word"]}
      {word["wordGB"]}
    </div>
  );
}
export default WordCard;
