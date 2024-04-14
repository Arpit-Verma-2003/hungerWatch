import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";

const FireStorepg = () => {
  const writeData = async () => {
    const result = await addDoc(collection(firestoreDb, "needers"), {
      donaterName: "arp",
      age: 20,
      area: "gurugram",
    });
    console.log(result);
  };
  const getDocument = async () => {
    const ref = doc(firestoreDb, "ThisIsUsers1", "fy73jRsK77Dcn6crBpnv");
    const snap = await getDoc(ref);
    console.log(snap.data());
  };
  const getDocumentsByQuery = async () => {
    const collectionRef = collection(firestoreDb, "ThisIsUsers1");
    const q = query(collectionRef, where("donater", "==", true));
    const snapShot = getDocs(q);
    (await snapShot).forEach((data) => console.log(data.data()));
  };
  return (
    <div>
      <button onClick={writeData}>Write Data</button>
      <button onClick={getDocument}>Get docs</button>
      <button onClick={getDocumentsByQuery}>Get documents by query</button>
    </div>
  );
};
export default FireStorepg;
