import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebase.config";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

interface IUser {
  uid: string;
  name: string;
  languageRefs: string[];
  wordRefs: string[];
}

export interface ILanguage {
  appName: string;
  flag: string;
  language: string;
}

export interface IWord {
  word: string;
  wordGB: string;
  createdAt: Timestamp;
  wordRefStr?: string;
}

interface IAppContext {
  user: IUser | null;
  languages: ILanguage[];
  words: IWord[];
  appName: string;
  loading: boolean;
  addWordToWords: (newWord: IWord) => void;
  deleteWord: (wordRefStr: string) => Promise<void>;
}

const appName = "Le Mot Du Jour";

const AppContext = createContext<IAppContext>({
  user: null,
  languages: [],
  words: [],
  appName: "Le Mot Du Jour",
  loading: true,
  addWordToWords: () => {},
  deleteWord: () => Promise.resolve(),
});

export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [words, setWords] = useState<IWord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // On login/logout
    const unsubscribe = onAuthStateChanged(
      auth,
      async (authUser: FirebaseAuthUser | null) => {
        setLoading(true);

        // If user is logged in
        if (authUser) {
          // Look in users collection for the user document that matches the uid of the logged in user
          const userRef = doc(collection(firestore, "users"), authUser.uid);
          const userDoc = await getDoc(userRef);

          // If this document exists
          if (userDoc.exists()) {
            // Set the data in this document to global variable user
            const userData = { uid: authUser.uid, ...userDoc.data() } as IUser;

            setUser(userData);

            const languagesData = userData.languageRefs
              ? await Promise.all(
                  userData.languageRefs.map(async (languageRefStr) => {
                    const [collectionName, docId] = languageRefStr
                      .split("/")
                      .slice(-2);
                    const languageRef = doc(
                      collection(firestore, collectionName),
                      docId
                    );
                    const languageDoc = await getDoc(languageRef);
                    return languageDoc.data() as ILanguage;
                  })
                )
              : [];
            setLanguages(languagesData);

            const wordsData = userData.wordRefs
              ? (
                  await Promise.all(
                    userData.wordRefs.map(async (wordRefStr) => {
                      const [collectionName, docId] = wordRefStr
                        .split("/")
                        .slice(-2);
                      const wordRef = doc(
                        collection(firestore, collectionName),
                        docId
                      );
                      const wordDoc = await getDoc(wordRef);
                      return { ...wordDoc.data(), wordRefStr } as IWord; // Add the wordRefStr property here
                    })
                  )
                ).sort((a: IWord, b: IWord) => {
                  // Sort in descending order based on the 'createdAt' timestamp
                  return b.createdAt.toMillis() - a.createdAt.toMillis();
                })
              : [];
            setWords(wordsData);
          }
        } else {
          // User is logged out
          setUser(null);
          setLanguages([]);
          setWords([]);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Function to add new word to word array
  const addWordToWords = (newWord: IWord) => {
    setWords((prevWords) => {
      const updatedWords = [...prevWords, newWord];
      return updatedWords.sort((a, b) => {
        if (a.createdAt?.seconds && b.createdAt?.seconds) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });
    });
  };

  // Function to delete word from database
  const deleteWord = async (wordRefStr: string) => {
    setLoading(true);

    // Update the words state.
    setWords((prevWords) =>
      prevWords.filter((word) => wordRefStr !== word.wordRefStr)
    );

    // Delete the word from the Firestore database and update the user document.
    const [collectionName, docId] = wordRefStr.split("/").slice(-2);
    const wordRef = doc(collection(firestore, collectionName), docId);
    await deleteDoc(wordRef);

    // Remove the wordRef from the user's wordRefs
    const newUserWordRefs = user?.wordRefs.filter((ref) => ref !== wordRefStr);
    if (newUserWordRefs) {
      const userRef = doc(collection(firestore, "users"), user!.uid);
      await updateDoc(userRef, { wordRefs: newUserWordRefs });

      // Update the user state
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            wordRefs: newUserWordRefs,
          };
        }
        return prevUser;
      });
    }

    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        languages,
        words,
        appName,
        loading,
        addWordToWords,
        deleteWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
