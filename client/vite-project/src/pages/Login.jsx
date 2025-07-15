import React, { useContext, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { useEffect } from "react";

const Login = () => {
  // const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const { userData, setuserData } = useContext(userDataContext);
  const { loading,setloading } = useContext(authDataContext);

  const { serverUrl } = useContext(authDataContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(result.data);

      setuserData(result.data.user);
    } catch (error) {
      setloading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full  flex items-center justify-center flex-col">
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
          className="  flex flex-col items-start justify-center "
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl">Welcome To AirBnb</h1>
          <label htmlFor="">Email</label>
          <input
            className="w-full border rounded-xl rounded-md p-1"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="">Password</label>
          <div className="w-full border rounded-xl">
            <input
              className="w-full rounded-md p-1"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            {/* {!show && (
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
          Create new Account?{" "}
          <span
            className="cursor-pointer text-red-800 font-medium"
            onClick={() => {
              navigate("/signup");
            }}
            disabled={loading}
          >
            {loading?"loading......":"Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
