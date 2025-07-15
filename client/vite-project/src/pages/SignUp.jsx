import React, { useContext, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { UNSAFE_withComponentProps, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

const SignUp = () => {
  // const [show, setshow] = useState(false);
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  const { userData, setuserData } = useContext(userDataContext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/auth/register",
        {
          userName: name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result.data.message);
      setuserData(result.data.user);
    } catch (error) {
      console.log("message:", error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen  w-[90%] flex items-center justify-center ">
      <div>
        <FaArrowCircleLeft
          className="text-5xl text-red-700 absolute top-[10%] left-[10%]"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="h-[90%] w-[90%]  flex items-center justify-center flex-col ">
        <form
          action=""
          className="flex flex-col items-start "
          onSubmit={handleSignup}
        >
          <h1 className="text-4xl">Welcome To AirBnb</h1>
          <label className="mt-5">UserName</label>
          <input
            className="w-full rounded-md p-1 border rounded-2xl"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
            placeholder="username"
          />
          <label htmlFor="">Email</label>
          <input
            className="w-full rounded-md p-1 border rounded-2xl"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            placeholder="email"
          />
          <label htmlFor="">Password</label>
          <div className="w-full">
            <input
              className="w-full rounded-md p-1 border rounded-2xl"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="password"
            />
{/* 
            {!show && (
              <MdRemoveRedEye
                className="absolute right-[32%] bottom-[42.5%] cursor-pointer"
                onClick={() => setshow((prev) => !prev)}
              />
            )}

            {show && (
              <IoEyeOffSharp
                className="absolute right-[32%] bottom-[42.5%] cursor-pointer"
                onClick={() => setshow((prev) => !prev)}
              />
            )} */}
          </div>
          <button onClick={()=>{navigate("/")}} className="px-6 py-1 bg-red-500 mt-5 rounded-lg">
            submit
          </button>
        </form>
        <p className="mt-10 ">
          Already have a Account?{" "}
          <span
            className="cursor-pointer text-red-800 font-medium"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
