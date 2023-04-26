import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import AppContext from "../context/AppContext";
import WordCard from "../components/WordCard";

function Words() {
  const { user, loading } = useContext(AppContext);

  const [userWords, setUserWords] = useState([]);

  useEffect(() => {
    const fetchUserWords = async () => {
      if (!loading && user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          setUserWords(doc.data().words);
        });
      }
    };

    console.log(userWords);

    fetchUserWords();
  }, [user, loading]);

  return <div>Hello!</div>;
}
export default Words;
