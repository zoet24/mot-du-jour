// AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebase.config";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import { doc, getDoc, collection, Timestamp } from "firebase/firestore";

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
}

interface IAppContext {
  user: IUser | null;
  languages: ILanguage[];
  words: IWord[];
  addWordToWords: (newWord: IWord) => void;
}

const AppContext = createContext<IAppContext>({
  user: null,
  languages: [],
  words: [],
  addWordToWords: () => {},
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

  useEffect(() => {
    // On login/logout
    const unsubscribe = onAuthStateChanged(
      auth,
      async (authUser: FirebaseAuthUser | null) => {
        // If user is logged in
        if (authUser) {
          // Look in users collection for the user document that matches the uid of the logged in user
          const userRef = doc(collection(firestore, "users"), authUser.uid);
          const userDoc = await getDoc(userRef);

          // If this document exists
          if (userDoc.exists()) {
            // Set the data in this document to global variable user
            const userData = { uid: authUser.uid, ...userDoc.data() } as IUser;
            console.log("User Data:", userData); // Debugging

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
                      return { ...wordDoc.data() } as IWord;
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
      }
    );

    return () => unsubscribe();
  }, []);

  // Function to add new word to word array
  const addWordToWords = (newWord: IWord) => {
    setWords((prevWords) => [...prevWords, newWord]);
  };

  return (
    <AppContext.Provider value={{ user, languages, words, addWordToWords }}>
      {children}
    </AppContext.Provider>
  );
};
