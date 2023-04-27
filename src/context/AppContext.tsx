// AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebase.config";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface IUser {
  name: string;
  wordRefs: string[];
}

export interface IWord {
  word: string;
  wordGB: string;
}

interface IAppContext {
  user: IUser | null;
  words: IWord[];
}

const AppContext = createContext<IAppContext>({ user: null, words: [] });

export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
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
            const userData = userDoc.data() as IUser;
            setUser(userData);

            const wordsData = await Promise.all(
              // Map over all wordRefs in userData
              userData.wordRefs.map(async (wordRefStr) => {
                // Split string into collection and document reference, then query firestore
                const [collectionName, docId] = wordRefStr.split("/").slice(-2);
                const wordRef = doc(
                  collection(firestore, collectionName),
                  docId
                );
                const wordDoc = await getDoc(wordRef);
                return wordDoc.data() as IWord;
              })
            );

            // Return all wordDocs within wordsData
            setWords(wordsData);
          }
        } else {
          // User is logged out
          setUser(null);
          setWords([]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, words }}>
      {children}
    </AppContext.Provider>
  );
};
