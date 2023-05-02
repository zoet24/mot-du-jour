import { useState, FormEvent } from "react";
import { useAppContext, IWord } from "../context/AppContext";
import { firestore } from "../firebase.config";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

function AddWord() {
  const { user, addWordToWords } = useAppContext();
  const [word, setWord] = useState("");
  const [wordGB, setWordGB] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to add a word.");
      return;
    }

    try {
      // Add a new document to the "words" collection
      const newWordRef = await addDoc(collection(firestore, "words"), {
        word,
        wordGB,
        createdAt: serverTimestamp(),
      });

      // Update the wordRefs array of the logged-in user
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        wordRefs: [...user.wordRefs, newWordRef.path],
      });

      // Get the newly added word document data
      const newWordDoc = await getDoc(newWordRef);
      const newWordData = newWordDoc.data() as IWord;

      // Add the wordRefStr property to the word object
      const newWordDataWithRefStr = {
        ...newWordData,
        wordRefStr: newWordRef.path,
      };

      // Update the global words state
      addWordToWords(newWordDataWithRefStr);

      // Clear the input fields
      setWord("");
      setWordGB("");

      toast.success("Word added successfully!");
    } catch (error) {
      console.error("Error adding word: ", error);
      toast.error("Error adding word.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        type="text"
        placeholder="Word (English)"
        value={wordGB}
        onChange={(e) => setWordGB(e.target.value)}
      />
      <button className="btn" type="submit">
        Add Word
      </button>
    </form>
  );
}

export default AddWord;
