import { useAppContext, IWord } from "../context/AppContext";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

interface WordCardProps {
  word: IWord;
  wordRefStr?: string;
}

function WordCard({ word, wordRefStr }: WordCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteWord } = useAppContext();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (wordRefStr) {
      try {
        await deleteWord(wordRefStr);
        setIsDeleteModalOpen(false);
      } catch (error) {
        toast.error("Error while deleting word"); // Add this log to see the error details
      }
    }
  };

  return (
    <div className="w-full bg-white border-green border-2 rounded-lg overflow-hidden shadow-card">
      <div className="p-3 bg-green flex items-center justify-between">
        <p className="capitalise text-white">{word["word"]}</p>
        <div className="flex space-x-1">
          {/* TODO - Add edit functionality */}
          <button className="icon icon--sm">
            <FiEdit />
          </button>
          <button className="icon icon--sm" onClick={handleDeleteClick}>
            <BsTrash3 />
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="capitalise">{word["wordGB"]}</p>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
export default WordCard;
