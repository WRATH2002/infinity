import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import Chatbody from "./Chatbody";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Loading = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubLoading, setIsSubLoading] = useState(true);
  useEffect(() => {
    // Creating a timeout within the useEffect hook
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setIsLoading(false);
      return () => clearTimeout(timer);
    }, 4000);
  }, []);

  useEffect(() => {
    // Creating a timeout within the useEffect hook
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setIsSubLoading(false);
      return () => clearTimeout(timer);
    }, 9000);
  }, []);

  return (
    <>
      {isLoading === true ? (
        <>
          <div className="w-full bg-[black] flex flex-col justify-center items-center h-[100dvh]">
            {/* <div class="col-3">
              <div class="snippet" data-title="dot-gathering">
                <div class="stage filter-contrast">
                  <div class="dot-gathering"></div>
                </div>
              </div>
            </div> */}
            {/* <svg viewBox="0 0 1236 600" className=" block m-auto">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                className="text-[120px] lg:text-[50px] md:text-[50px] text-center stroke-[2px] lg:stroke-[1px] md:stroke-[1px]"
              >
                INFINITY
              </text>
            </svg> */}
            {/* <div class="custom-loader"></div> */}
            <div className="w-[200px] lg:w-[400px] md:w-[400px] h-[4px] rounded-full ">
              <span class="loader"></span>
            </div>
            {/* <span className="text-[13px] lg:text-[16px] md:text-[16px] tracking-[13px] lg:tracking-[17px] md:tracking-[17px] font-semibold text-[#cdd8dd] mt-[20px] w-full flex justify-center items-center">
              FETCHING MESSAGES
            </span> */}
          </div>
          <div className="hidden">
            <Sidebar />
          </div>
        </>
      ) : isSubLoading === true ? (
        <>
          <div className="w-full bg-[black] flex flex-col justify-center items-center h-[100dvh]">
            <svg
              viewBox="0 0 1236 600"
              className="  m-auto flex justify-center items-center"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                className="text-[120px] lg:text-[50px] md:text-[50px] text-center stroke-[2px] lg:stroke-[1px] md:stroke-[1px]"
              >
                INFINITY
              </text>
            </svg>
          </div>
          <div className="hidden">
            <Sidebar />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex  justify-between items-center">
            <Sidebar />
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => console.log(e.target.files[0])}
            ></input> */}
            {/* <span onChange={}>Send</span> */}
            {/* <div className="flex flex-col justify-center items-center">
              <Login />
              <Signup />
            </div> */}

            {/* {authUser ? <>Loged In</> : <>Loged Out</>} */}

            {/* <button className="font-bold" onClick={userSignOut}>
                Sign Out
              </button> */}
            {/* <div className="flex flex-col justify-center items-center">
              <button
                className="font-bold"
                onClick={() =>
                  createUserFriendCollection(
                    "Xoc9DGMYGYT2Lw91WZB09laqfD12",
                    "Sourav Poddar"
                  )
                }
              >
                Sourav
              </button>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", "Hello 1")
                }
              >
                Hello 1
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", "How Are you 1")
                }
              >
                How Are you 1
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", " Who are you 1")
                }
              >
                Who are you 1
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "Xoc9DGMYGYT2Lw91WZB09laqfD12",
                    "You will Get best job 1"
                  )
                }
              >
                You will Get best job 1
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", "Hello 2")
                }
              >
                Hello 2
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", "How Are you 2")
                }
              >
                How Are you 2
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("Xoc9DGMYGYT2Lw91WZB09laqfD12", " Who are you 2")
                }
              >
                Who are you 2
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "Xoc9DGMYGYT2Lw91WZB09laqfD12",
                    "You will Get best job 2"
                  )
                }
              >
                You will Get best job 2
              </span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <button
                className="font-bold"
                onClick={() =>
                  createUserFriendCollection(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    "Himadri Purkait"
                  )
                }
              >
                Himadri
              </button>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    "Can you give your number 3"
                  )
                }
              >
                Can you give your number 3
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("GqC1MfHsLVZU4DsD52cObQClai32", "Who is She 3")
                }
              >
                Who is She 3
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    " What is your income 3"
                  )
                }
              >
                What is your income 3
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    "prime minister 3"
                  )
                }
              >
                prime minister 3
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    "Can you give your number 4"
                  )
                }
              >
                Can you give your number 4
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage("GqC1MfHsLVZU4DsD52cObQClai32", "Who is She 4")
                }
              >
                Who is She 4
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    " What is your income 4"
                  )
                }
              >
                What is your income 4
              </span>
              <span
                className="cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  sendMessage(
                    "GqC1MfHsLVZU4DsD52cObQClai32",
                    "prime minister 4"
                  )
                }
              >
                prime minister 4
              </span>
            </div> */}
            {/* <Login /> */}
            <Chatbody />
          </div>
        </>
      )}
    </>
  );
};

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);
  function createUserFriendCollection(UserId, UserName) {
    // const user = firebase.auth().currentUser;
    // console.log(user.uid);
    // db.collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Chat Friends")
    //   .doc(UserId)
    //   .set({
    //     Name: UserName,
    //   });
    // console.log("done");
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out Successfully"))
      .catch((error) => console.log(error));
  };

  function sendMessage(UserId, Message) {
    // console.log("Clicked");
    // const user = firebase.auth().currentUser;
    // const userDoc = db
    //   .collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Chat Friends")
    //   .doc(UserId);
    // userDoc.get().then((doc) => {
    //   if (doc.exists) {
    //     console.log("Document available");
    //     userDoc.update({
    //       ChatHistory: firebase.firestore.FieldValue.arrayUnion({
    //         Flag: 1,
    //         id: 10,
    //         Message: Message,
    //       }),
    //     });
    //   } else {
    //     db.collection("Chat Record")
    //       .doc(user.uid)
    //       .collection("Chat Friends")
    //       .doc(UserId)
    //       .set({
    //         ChatHistory: [
    //           {
    //             Flag: 1,
    //             id: 10,
    //             Message: Message,
    //           },
    //         ],
    //       });
    //     console.log("No such document");
    //   }
    // });
    // // -------------------------------------------
    // const MyDoc = db
    //   .collection("Chat Record")
    //   .doc(UserId)
    //   .collection("Chat Friends")
    //   .doc(user.uid);
    // MyDoc.get().then((doc) => {
    //   if (doc.exists) {
    //     console.log("Document available");
    //     MyDoc.update({
    //       ChatHistory: firebase.firestore.FieldValue.arrayUnion({
    //         Flag: 2,
    //         id: 10,
    //         Message: Message,
    //       }),
    //     });
    //   } else {
    //     db.collection("Chat Record")
    //       .doc(UserId)
    //       .collection("Chat Friends")
    //       .doc(user.uid)
    //       .set({
    //         ChatHistory: [
    //           {
    //             Flag: 2,
    //             id: 10,
    //             Message: Message,
    //           },
    //         ],
    //       });
    //     console.log("No such document");
    //   }
    // });
    // db.collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Chat Friends")
    //   .doc(UserId)
    //   .set({
    //     ChatHistory: [
    //       {
    //         Flag: 1,
    //         id: 10,
    //         Message: Message,
    //       },
    //     ],
    //   });
    // db.collection("Chat Record")
    //   .doc(UserId)
    //   .collection("Chat Friends")
    //   .doc(user.uid)
    //   .set({
    //     Name: "Himadri Purkait",
    //     ChatHistory: [
    //       {
    //         Flag: 2,
    //         id: 10,
    //         Message: Message,
    //       },
    //     ],
    //   });
    // userDoc.update({
    //   uid: firebase.firestore.FieldValue.arrayUnion({
    //     user: chatMessage[chatMessage.length - 1].user,
    //     assistant: chatMessage[chatMessage.length - 1].assistant,
    //     id: chatMessage[chatMessage.length - 1].id,
    //   }),
    // });
  }

  function uploadImage(e) {
    console.log(e.target.files);
  }
  const mode = useSelector((store) => store.chat.signingMode);

  return (
    <>
      {authUser ? (
        <>
          <Loading />
          {/* <button className="font-bold" onClick={userSignOut}>
            Sign Out
          </button> */}
        </>
      ) : (
        <>
          <div className="w-full h-[100dvh] flex flex-col justify-center items-center bg-[#0b0c0b]">
            {mode === 1 ? <Login /> : <Signup />}
          </div>
        </>
      )}
    </>
  );
};

export default AuthDetails;
