import { useEffect, useState } from "react";
import { firestore, auth } from "../firebase.config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

function Words() {
  return <div>{auth.currentUser?.displayName}</div>;
}
export default Words;
