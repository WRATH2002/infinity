import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
// --------------------Icons----------------
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoGoogle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toggleStateMode } from "../../utils/chatSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        toast.error("Invalid Login Credentials");
        // toast.error(error.message);
        // console.log(error);
        // console.log(error.message);
      });
  };
  function changeMode() {
    dispatch(toggleStateMode(2));
  }
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-[300px] lg:w-[350px] md:w-[350px] p-[40px] rounded-lg h-[70%] bg-[#fce9ed] flex flex-col justify-center items-center">
        {/* <span className="in  font-bold text-[40px] mb-[30px]">INFINITY</span> */}
        <div className="w-full flex flex-col ">
          <span className="text-[32px] text-[black] font-[rubik] font-medium ">
            Login{" "}
          </span>
          <span className="text-[14px] font-normal text-[black] font-[rubik] ">
            new user
            <span
              className="text-[black] hover:text-[#9aa0a2] cursor-pointer  font-normal"
              style={{ transition: ".3s" }}
              onClick={() => changeMode()}
            >
              {" "}
              signup here
            </span>
          </span>
        </div>
        {/* <div>Signup</div> */}
        {/* <input
          className="outline-none  mt-[40px]  w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input> */}
        {/* <input
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
        ></input> */}
        <input
          className="log outline-none font-[rubik] mt-[40px] bg   w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-[white] bg-[#d9e1e4]"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="log outline-none font-[rubik]    w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-[white] bg-[#d9e1e4]"
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
          className="w-full h-[40px] text-[#ffffff] font-[rubik] font-medium outline-none flex justify-center items-center bg-[#09161c] hover:bg-[#b8dedf] hover:text-[black] rounded-md mt-[30px]"
          style={{ transition: ".3s" }}
          type="submit"
          onClick={signIn}
        >
          Log In
        </button>
      </div>
      {/* <div className="w-full h-[100vh] flex justify-center items-center bg-[#f1f3f6]">
        <div className="neo w-full lg:w-[350px] md:w-[350px] h-[100vh] lg:h-[600px] md:h-[600px] flex flex-col justify-center items-center rounded-xl px-[30px]">
          <div className="w-full h-[100px] flex justify-center items-center ">
            <span className="font-semibold text-[26px] mt-[70px]">
              INFINITY
            </span>
          </div>
          <div className="w-full h-[350px] flex justify-center items-center flex-col">
            <input
              className="neo w-full h-[50px] rounded-lg my-[10px] px-[15px] outline-none"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="neo w-full h-[50px] rounded-lg my-[10px] px-[15px] outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span className="w-full h-[20px] mb-[10px] px-[15px] text-[13px] flex justify-end items-center ">
              Forgot password
            </span>
            <button className="neoout w-full h-[50px] rounded-lg my-[10px] px-[15px] bg-[#5193f2] text-white">
              LOGIN
            </button>
          </div>
          <div className="w-full h-[150px]  flex justify-center items-center flex-col pb-[80px]">
            <span>Login With</span>
            <div className="flex justify-center items-center ">
              <div>
                <BiLogoFacebook />
              </div>
              <div>
                <BiLogoTwitter />
              </div>
              <div>
                <BiLogoInstagram />
              </div>
              <div>
                <BiLogoGoogle />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;
