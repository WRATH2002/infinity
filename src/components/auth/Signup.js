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
  const [error, setError] = useState("");
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
      onTimeHour: 0,
      onTimeMinute: 0,
      totalDay: 0,
      totalHour: 0,
    });
    console.log("done");
  }
  const signUp = (e) => {
    const letterPattern = /[a-zA-Z]/;
    e.preventDefault();
    if (name.length === 0) {
      setError("Name can't be empty");
    } else if (letterPattern.test(number)) {
      setError("Number must contain only digits");
    } else if (number.length < 10 || number.length > 10) {
      setError("Number must be 10 digits");
    } else if (email.length === 0 || !email.includes("@gmail.com")) {
      setError("Email must contain '@gmail.com'");
    } else if (password.length < 8) {
      setError("Password should be atleast 8 characters");
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
          setError("Oops! Email already in use");
        });
    }
  };
  function changeModeTwo() {
    dispatch(toggleStateMode(1));
  }

  return (
    <>
      <div className="w-full lg:w-[350px] md:w-[350px] p-[40px] rounded-none md:rounded-xl lg:rounded-xl h-[100svh] md:h-[70%] lg:h-[70%]  flex flex-col justify-center items-center">
        <div className="w-full flex flex-col">
          <span className="text-[40px] text-[black] font-[google] font-bold tracking-wider b2">
            Signup{" "}
          </span>
          <span className="text-[15px] font-normal font-[google] text-[#000000b4] ">
            already a user ?
            <span
              className="text-[#9a53a1] hover:text-[#9a53a1] cursor-pointer font-normal"
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
          className=" outline-none  mt-[40px]  w-full h-[50px] my-[10px] rounded-2xl px-[15px] font-[google] font-normal text-[14px] text-[black] bg-[#e4eaf1] log"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className=" outline-none    w-full h-[50px] mb-[10px] rounded-2xl px-[15px] font-[google] font-normal text-[14px] text-[black] bg-[#e4eaf1] log"
          placeholder="Phone Number"
          type="tel"
          value={number}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key == "Backspace") {
              if (number.length == 10) {
                setNumber(number.slice(0, -1));
              }
            }
          }}
          onChange={(e) => {
            if (number.length <= 9) {
              setNumber(e.target.value);
            } else {
            }
          }}
        ></input>
        <input
          className=" outline-none    w-full h-[50px] mb-[10px] rounded-2xl px-[15px] font-[google] font-normal text-[14px] text-[black] bg-[#e4eaf1] log"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {show === true ? (
          <div className="w-full flex justify-center items-center">
            <input
              className=" outline-none    w-full h-[50px] mb-[7px] rounded-2xl px-[15px] font-[google] font-normal text-[14px] text-[black] bg-[#e4eaf1] log"
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
              <IoEyeOff className="text-[#000000] text-[20px]" />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <input
              className=" outline-none    w-full h-[50px] mb-[7px] rounded-2xl px-[15px] font-[google] font-normal text-[14px] text-[black] bg-[#e4eaf1] log"
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
              <IoEye className="text-[#000000] text-[20px]" />
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
        <div className="w-full flex justify-end items-center font-[google] font-normal mt-0 text-[15px] text-[#fc4506]">
          {error}
        </div>

        <button
          className="w-full h-[50px] text-[#000000] text-[17px] font-medium font-[google] outline-none flex justify-center items-center bg-[#96df73]  rounded-2xl mt-[15px]"
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
