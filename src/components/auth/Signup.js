import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleStateMode } from "../../utils/chatSlice";
// import { auth } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { db } from "../firebase";
// import firebase from "../../firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //   function createFirestoreAccount() {
  //     const user = firebase.auth().currentUser;

  //     if (chatMessage.length != 0) {
  //       const user = firebase.auth().currentUser;
  //       if (user) {
  //         const userDoc = db
  //           .collection("users")
  //           .doc(user.uid)
  //           .collection("Chat Segment")
  //           .doc(toggleCreateNewChatInput);

  //         console.log("userDoc");
  //         console.log(userDoc);
  //         userDoc.get().then((doc) => {
  //           if (doc.exists) {
  //             console.log("Document available");
  //           } else {
  //             // db.collection("users")
  //             //   .doc(user.uid)
  //             //   .collection("Chat Segment")
  //             //   .doc("test 1")
  //             //   .set({
  //             //     uid: [{ user: "Question", assistant: "Answer", id: 1 }],
  //             //   });
  //             // doc.data() will be undefined in this case
  //             console.log("No such document");
  //           }
  //         });

  //         userDoc.update({
  //           uid: firebase.firestore.FieldValue.arrayUnion({
  //             user: chatMessage[chatMessage.length - 1].user,
  //             assistant: chatMessage[chatMessage.length - 1].assistant,
  //             id: chatMessage[chatMessage.length - 1].id,
  //           }),
  //         });
  //       }
  //     }
  //   }
  function createUserCollection(user) {
    db.collection("Chat Record").doc(user.uid).set({
      Name: name,
      Email: email,
      Info: "Hi folks! I am new to infinity.",
      Phone: number,
      Photo: "nophoto",
    });
    console.log("done");
  }
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        console.log(userCredential.user.email);
        console.log(userCredential);
        createUserCollection(userCredential.user);
        // db.collection("Chat Record")
        //   .doc(userCredential.user.uid)
        //   .collection("Chats");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  function changeModeTwo() {
    dispatch(toggleStateMode(1));
  }

  return (
    <>
      <div className="w-[300px] lg:w-[350px] md:w-[350px] p-[40px] rounded-lg h-[70%] bg-[#1f201f] flex flex-col justify-center items-center">
        <div className="w-full flex flex-col">
          <span className="text-[32px] text-[#cdd8dd] font-semibold">
            Signup{" "}
          </span>
          <span className="text-[14px] font-normal font-[nunitosans] text-[#9fa5a7] ">
            already a user
            <span
              className="text-[#7761f2] hover:text-[#9a8af5] cursor-pointer"
              style={{ transition: ".3s" }}
              onClick={() => changeModeTwo()}
            >
              {" "}
              login here
            </span>
          </span>
        </div>
        {/* <div>Signup</div> */}
        <input
          className="outline-none  mt-[40px]  w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="outline-none    w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Phone Number"
          type="tel"
          value={number}
          onChange={(e) => {
            if (number.length <= 10) {
              setNumber(e.target.value);
            } else {
            }
          }}
        ></input>
        <input
          className="outline-none    w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="outline-none    w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {/* <button
          type="submit"
          onClick={signUp}
          className="bg-slate-600 text-white w-[100px]"
        >
          Signup
        </button> */}
        <button
          className="w-full h-[40px] text-[#cdd8dd] font-semibold outline-none flex justify-center items-center bg-[#5841d9] hover:bg-[#9a8af5] rounded-md mt-[30px]"
          style={{ transition: ".3s" }}
          type="submit"
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Signup;
