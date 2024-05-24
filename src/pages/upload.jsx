
import React, { useEffect, useState, useLayoutEffect } from "react";
import "./uPload.css"; // Import the external CSS file
import { storage, app } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import axios from "axios";

const Upload = () => {
  const db = getFirestore(app);
  const [user, setUser] = useState();
  const [img, setImg] = useState(null);
  const [txt, setTxt] = useState(null);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});
  const [currentPostId, setCurrentPostId] = useState(null);
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = getAuth(app);

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    const imgref = ref(storage, `proof/${v4()}`);
    uploadBytes(imgref, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const handleClick = async () => {
    if (!txt) {
      alert("Make Sure You Have Added Caption Before Creating A Post");
      return;
    }
    if (!img) {
      alert("Make Sure You Have Added Proof Photo Before Creating A Post");
      return;
    }
    const valueRef = collection(firestoreDb, "posts");
    const newPost = await addDoc(valueRef, {
      caption: txt,
      proof: img,
      userMail: user.email,
      userName: user.displayName,
      userLocation: currLocation.city,
    });
    setCurrentPostId(newPost.id);
    alert("Post added successfully");
    getData();
    getDocumentsByQuery();
  };

  const getData = async () => {
    const valueRef = collection(firestoreDb, "posts");
    const dataDb = await getDocs(valueRef);
    const allData = dataDb.docs.map(async (val) => {
      const postData = { ...val.data(), id: val.id };
      await getCommentsForPost(val.id); // Fetch comments for each post
      return postData;
    });
    const resolvedData = await Promise.all(allData);
    setData(resolvedData);
  };

  const getCommentsForPost = async (postId) => {
    const commentRef = collection(firestoreDb, "comments");
    const q = query(commentRef, where("postId", "==", postId));
    const snapshot = await getDocs(q);
    const postComments = snapshot.docs.map((doc) => doc.data());
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: postComments,
    }));
  };

  const getDocumentsByQuery = async () => {
    try {
      const collectionRef = collection(firestoreDb, "posts");
      const q = query(
        collectionRef,
        where("userLocation", "==", currLocation.city)
      );
      const snapShot = await getDocs(q);
      (await snapShot).forEach((data) => {
        console.log(data.data());
        getCommentsForPost(data.id);
      });
    } catch (error) {
      console.log("error fetching your documents");
    }
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);

  useEffect(() => {
    getLocation();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getData();
        getDocumentsByQuery();
        console.log(user.displayName);
      } else {
        setUser(null);
        console.log("You need to log in first");
      }
    });
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=28.667856&lon=77.449791");
      setCurrLocation(location.data.address);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (postId, userEmail) => {
    try {
      const postDoc = await getDoc(doc(db, "posts", postId));
      if (postDoc.exists() && postDoc.data().userMail) {
        const postUserMail = postDoc.data().userMail;
        if (userEmail === postUserMail) {
          console.log("You can delete this post");
          await deleteDoc(postDoc.ref);
          alert("Post Successfully Deleted");
          getData();
          getDocumentsByQuery();
        } else {
          console.log("You can't delete this post");
          alert("You are not authorized to delete this post.");
        }
      } else {
        console.log("Post not found or userMail field missing");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleComment = async (commentText, postId) => {
    if (!postId) {
      console.error("No post id provided for commenting");
      return;
    }

    const commentRef = collection(firestoreDb, "comments");
    await addDoc(commentRef, {
      postId: postId,
      comment: commentText,
      userMail: user.email,
      userName: user.displayName,
    });
    alert("Comment Successfully Added");
    getCommentsForPost(postId);
  };

  if (isLoading) {
    return <div>Grabbing Your Location...</div>;
  }
  if (error) {
    return <div>Kuch toh gadbad hai location access krne me teri</div>;
  }

  if (user) {
    return (
      <div id="upload-container">
        <h1 className="need-help-heading">
          Need Help {user.displayName} ? Upload a Post 👇
        </h1>
        <input
          type="file"
          className="upload-input"
          onChange={(e) => uploadImage(e)}
        />{" "}
        <br /> <br />
        <input
          onChange={(e) => setTxt(e.target.value)}
          className="caption-input"
          placeholder="Enter Details"
        />
        <button onClick={handleClick} className="upload-button">
          Create Post
        </button>
        <br /> <br />
        <button onClick={getDocumentsByQuery} className="upload-button">
          Only Show {currLocation.city} Posts
        </button>
        <br />
        <h1>Wanna Volunteer ? Recent Need Posts Near {currLocation.city} - </h1>
        {data.map((value) => (
          <div key={value.id} className="post-container">
            <img src={value.proof} className="post-image" alt="" />
            <br />
            <button
              onClick={() => deletePostHandler(value.id, user.email)}
              className="delete-button"
            >
              Delete Post
            </button>
            <h3>Details - {value.caption}</h3>
            <h3>Post By - {value.userMail}</h3>
            <h4>Comments:</h4>
            {comments[value.id] &&
              comments[value.id].map((comment, index) => (
                <div key={index}>
                  <p>
                    {comment.userName}: {comment.comment}
                  </p>
                </div>
              ))}
            <input
              type="text"
              placeholder="Want To Help ?"
              className="comment-input"
              onChange={(e) => {
                const { value } = e.target;
                setCurrentPostId(value.id); // Set currentPostId before calling handleComment
                setTxt(value); // Update txt state with the comment text
              }}
            />
            <button
              onClick={() => handleComment(txt, value.id)}
              className="submit-button"
            >
              Submit
            </button>
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div id="upload-container">
        <h1 className="need-help-heading">You Need To Log In First</h1>
      </div>
    );
  }
};

export default Upload;
