import { useAppContext, IWord } from "../context/AppContext";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase.config";

interface WordCardProps {
  word: IWord;
  wordRefStr?: string;
}

function WordCard({ word, wordRefStr }: WordCardProps) {
  // Button menu
  const [showButtons, setShowButtons] = useState(false);

  // Edit state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedWord, setEditedWord] = useState(word.word);
  const [editedWordGB, setEditedWordGB] = useState(word.wordGB);

  // Delete state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteWord, updateWordInWords } = useAppContext();

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
        toast.error("Error while deleting word");
      }
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    toast.info("Updating word - save your changes by pressing Enter");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleSaveClick = async () => {
    if (
      wordRefStr &&
      (editedWord !== word.word || editedWordGB !== word.wordGB)
    ) {
      try {
        const [collectionName, docId] = wordRefStr.split("/").slice(-2);
        const wordRef = doc(firestore, collectionName, docId);
        await updateDoc(wordRef, {
          word: editedWord,
          wordGB: editedWordGB,
        });

        // Update the word data in the global words state
        updateWordInWords(
          { word: editedWord, wordGB: editedWordGB, createdAt: word.createdAt },
          wordRefStr
        );

        // Update the local state
        word.word = editedWord;
        word.wordGB = editedWordGB;

        // Exit edit mode
        setIsEditMode(false);
        setShowButtons(false);
        toast.success("Word updated successfully!");
      } catch (error) {
        console.error("Error updating word: ", error);
        toast.error("Error updating word.");
      }
    }
  };

  return (
    <div
      onClick={() => setShowButtons((prev) => !prev)}
      className="relative w-full bg-white border-green border-2 rounded-lg shadow-card overflow-hidden"
    >
      {/* Word FR */}
      <div className="p-2 bg-green">
        {isEditMode ? (
          <input
            type="text"
            className="p-1 capitalise rounded-md border-2 border-green text-green bg-white w-full focus:outline-none"
            value={editedWord}
            onChange={(e) => setEditedWord(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p className="p-1 capitalise border-2 border-green text-white">
            {word["word"]}
          </p>
        )}
      </div>
      {/* Word GB */}
      <div className="p-2">
        {isEditMode ? (
          <input
            type="text"
            className="p-1 mr-2 rounded-md border-2 border-green text-green w-full focus:outline-none"
            value={editedWordGB}
            onChange={(e) => setEditedWordGB(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p className="p-1 border-2 border-white text-green">
            {word["wordGB"]}
          </p>
        )}
      </div>
      {showButtons && !isEditMode && (
        <div className="absolute inset-0 bg-black/60 flex justify-center space-x-4">
          <button className="icon icon--secondary" onClick={handleEditClick}>
            <FiEdit />
            <span className="icon-text">Edit word</span>
          </button>
          <button className="icon icon--secondary" onClick={handleDeleteClick}>
            <BsTrash3 />
            <span className="icon-text">Delete word</span>
          </button>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
export default WordCard;
