import React, { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const Fetch = () => {
    const [imgList, setImgList] = useState([]);
    const listAllRef = ref(storage, "proof/");
    useEffect(() => {
        listAll(listAllRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImgList((prev) => [...prev,url]);
            });
          });
        });
      }, []);
  return (
    <>
    <h1>Here Are The Recent Need Posts</h1>
    {imgList.map((url)=>{
        return <img src={url}/>
      })}
    </>
  )
}

export default Fetch