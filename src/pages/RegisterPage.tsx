import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { auth, signinWithGoogleHandler } from "../../firebase/firebaseConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";

type userDetailsState = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [userDetails, setUserDetails] = useState<userDetailsState>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeUserDetailsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submitSignupHandler = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password } = userDetails;

    if (username.trim().length === 0 || password.trim().length < 8) return;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      const token = await response.user.getIdToken();

      const userData = {
        name: response.user.displayName,
        email: response.user.email,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userdata", JSON.stringify(userData));
    } catch (error) {
      console.error("Error creating User: ", error);
    }
  };

  return (
    <div className="md:shadow-md min-h-screen h-full p-8 space-y-8 pt-20">
      <div className="space-y-4">
        <h2 className="text-3xl">
          Create your new <br></br> account
        </h2>
        <p className="text-sm text-[#878787]">
          Create an account to start looking for the food you like
        </p>
      </div>
      <form onSubmit={submitSignupHandler} className="space-y-5">
        <p className="flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={userDetails.email}
            onChange={changeUserDetailsHandler}
            className="rounded-md p-2 border border-gray-200"
            placeholder="Enter Email"
          />
        </p>
        <p className="flex flex-col gap-1">
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            name="username"
            value={userDetails.username}
            onChange={changeUserDetailsHandler}
            className="rounded-md p-2 border border-gray-200"
            placeholder="Username"
          />
        </p>
        <p className="relative flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={userDetails.password}
            onChange={changeUserDetailsHandler}
            className="rounded-md p-2 border border-gray-200"
            placeholder="Password"
          />
          {showPassword ? (
            <FaEye
              size={20}
              className="absolute right-3 top-10"
              onClick={togglePasswordHandler}
            />
          ) : (
            <FaEyeSlash
              size={20}
              className="absolute right-3 top-10"
              onClick={togglePasswordHandler}
            />
          )}
        </p>
        <div className="flex gap-1 items-start">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm">
            I Agree with{" "}
            <span className="text-[#FE8C00]">Terms of Service</span> and{" "}
            <span className="text-[#FE8C00]">Privacy Policy</span>{" "}
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#FE8C00] w-full p-2 text-white rounded-full"
        >
          Register
        </button>
      </form>

      <div className="flex items-center gap-2">
        <div className="border border-[#878787] w-1/3" />
        <span className="text-sm w-1/3 text-[#878787]">Or sign in with</span>
        <div className="border border-[#878787] w-1/3" />
      </div>

      <div>
        <FcGoogle
          size={40}
          onClick={signinWithGoogleHandler}
          className="mx-auto border border-[#D6D6D6] rounded-full p-1"
        />
      </div>

      <div className="text-sm text-center">
        <span>Have an account?</span>
        <Link to="/login" className="text-[#FE8C00]">
          {" "}
          Sign In
        </Link>
      </div>
    </div>
  );
}
