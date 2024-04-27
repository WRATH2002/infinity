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

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("false");

  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        toast.error("Invalid Login Credentials");
        console.log(error);
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
      <div className="w-full lg:w-[350px] md:w-[350px] p-[40px] rounded-none md:rounded-xl lg:rounded-xl h-[100svh] md:h-[70%] lg:h-[70%]  flex flex-col justify-center items-center">
        {/* <span className="in  font-bold text-[40px] mb-[30px]">INFINITY</span> */}
        <div className="w-full flex flex-col ">
          <span className="text-[40px] text-[#ffffff] font-[google] font-bold tracking-wider b2">
            Login{" "}
          </span>
          <span className="text-[15px] font-normal text-[#000000b4] font-[google] ">
            new user ?
            <span
              className="text-[#9a53a1] hover:text-[#9a53a1] cursor-pointer  font-normal"
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
          className="log outline-none font-[google] mt-[40px] bg  text-[16px] w-full h-[50px] my-[10px] rounded-xl px-[15px] font-normal  text-[black] bg-[#e4eaf1]"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        {show === true ? (
          <div className="w-full flex justify-center items-center">
            <input
              className=" log outline-none font-[google]  text-[16px]  w-full h-[50px] my-[10px] rounded-xl px-[15px] font-normal  text-[black] bg-[#e4eaf1] placeholder:black"
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
              className="log outline-none font-[google] text-[14px]   w-full h-[50px] my-[10px] rounded-xl px-[15px] font-normal  text-[black] bg-[#e4eaf1] placeholder:black"
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
        {/* <div className=" font-[google] mt-[5px] bg  text-[15px] w-full h-[10px] my-[10px] flex justify-end items-center rounded-xl  font-normal  text-[#ffffff] ">
          forgot password ?
        </div> */}
        {/* <button
          type="submit"
          onClick={signUp}
          className="bg-slate-600 text-white w-[100px]"
        >
          Signup
        </button> */}
        {/* <div className=" font-[google] mt-[20px] bg  text-[15px] w-full h-[10px]  flex justify-start items-center rounded-xl  font-normal  text-[#ff483f] ">
          * forgot password ?
        </div> */}
        <button
          className="w-full h-[50px] text-[17px] text-[#ffffff] font-[google] font-medium outline-none flex justify-center items-center bg-[#000000]  rounded-xl mt-[10px]"
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
