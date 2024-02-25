import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleStateMode } from "../../utils/chatSlice";
import toast, { Toaster } from "react-hot-toast";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
// import { auth } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { db } from "../firebase";
// import firebase from "../../firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("false");

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
      AccountStatus: true,
    });
    console.log("done");
  }
  const signUp = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error("Enter your Name");
    } else if (number.length === 0) {
      toast.error("Enter your Phone Number");
    } else if (email.length === 0 || !email.includes("@gmail.com")) {
      toast.error("Enter valid Email id");
    } else if (password.length < 6) {
      toast.error("Password must be atleast 6 digits");
    } else {
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
    }
  };
  function changeModeTwo() {
    dispatch(toggleStateMode(1));
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full lg:w-[350px] md:w-[350px] p-[40px] rounded-none md:rounded-xl lg:rounded-xl h-[100svh] md:h-[70%] lg:h-[70%]  flex flex-col justify-center items-center">
        <div className="w-full flex flex-col">
          <span className="text-[40px] text-[white] font-[google] font-bold tracking-wider">
            Signup{" "}
          </span>
          <span className="text-[15px] font-normal font-[google] text-[#cacaca] ">
            already a user ?
            <span
              className="text-[#ffb6b5] hover:text-[#fe9c9a] cursor-pointer font-normal"
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
          className="input outline-none  mt-[40px]  w-full h-[50px] my-[10px] rounded-md px-[15px] font-[google] font-normal text-[17px] text-[white] bg-[#292f3f] log"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="input outline-none    w-full h-[50px] my-[10px] rounded-md px-[15px] font-[google] font-normal text-[17px] text-[white] bg-[#292f3f] log"
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
          className="input outline-none    w-full h-[50px] my-[10px] rounded-md px-[15px] font-[google] font-normal text-[17px] text-[white] bg-[#292f3f] log"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {show === true ? (
          <div className="w-full flex justify-center items-center">
            <input
              className="input outline-none    w-full h-[50px] my-[10px] rounded-md px-[15px] font-[google] font-normal text-[17px] text-[white] bg-[#292f3f] log"
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div
              className="w-[50px] h-[40px] ml-[-50px] flex justify-center items-center"
              onClick={() => {
                setShow(!show);
              }}
            >
              <IoEyeOff className="text-[#ffb6b5] text-[20px]" />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <input
              className="input outline-none    w-full h-[50px] my-[10px] rounded-md px-[15px] font-[google] font-normal text-[17px] text-[white] bg-[#292f3f] log"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div
              className="w-[50px] h-[40px] ml-[-50px] flex justify-center items-center"
              onClick={() => {
                setShow(!show);
              }}
            >
              <IoEye className="text-[#ffb6b5] text-[20px]" />
            </div>
          </div>
        )}

        {/* <button
          type="submit"
          onClick={signUp}
          className="bg-slate-600 text-white w-[100px]"
        >
          Signup
        </button> */}
        <button
          className="w-full h-[50px] text-[#000000] text-[19px] font-medium font-[google] outline-none flex justify-center items-center bg-[#ffb6b5] hover:bg-[#b8dedf] hover:text-[black] rounded-md mt-[30px]"
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
