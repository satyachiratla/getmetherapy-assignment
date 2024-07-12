import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginSuccessFloater from "../components/LoginSuccessFloater";

type LoginState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userdata") || "{}");

  useEffect(() => {
    if (userData?.email) {
      setLoginSuccess(true);
    }
  }, [userData]);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeLoginDetailsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (
      loginDetails.email.trim().length === 0 ||
      loginDetails.password.trim().length < 8
    )
      return;

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );
      console.log("res", response);
      const token = await response.user.getIdToken();

      const userData = {
        email: response.user.email,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userdata", JSON.stringify(userData));
      setLoginSuccess(true);
    } catch (error) {
      console.log("Error Siging In: ", error);
    }
  };

  const signinWithGoogleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user;
        const token = await result.user.getIdToken();

        localStorage.setItem("token", token);

        localStorage.setItem(
          "userdata",
          JSON.stringify({ name: displayName, email, profilePic: photoURL })
        );
        setLoginSuccess(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {!loginSuccess ? (
        <div className="shadow-md min-h-screen h-full p-8 space-y-8 pt-20">
          <div className="space-y-4">
            <h2 className="text-3xl">
              Login to your <br></br> account.
            </h2>
            <p className="text-sm text-[#878787]">
              Please sign in to your account{" "}
            </p>
          </div>
          <form onSubmit={loginSubmitHandler} className="space-y-5">
            <p className="flex flex-col gap-1">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={loginDetails.email}
                onChange={changeLoginDetailsHandler}
                className="rounded-md p-2 border border-gray-200"
                placeholder="Enter Email"
              />
            </p>
            <p className="relative flex flex-col gap-1">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginDetails.password}
                onChange={changeLoginDetailsHandler}
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
            <button
              type="button"
              className="text-[#FE8C00] text-sm float-right py-1"
            >
              Forgot Password?
            </button>
            <button
              type="submit"
              className="bg-[#FE8C00] w-full p-2 text-white rounded-full"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-2">
            <div className="border border-[#878787] w-1/3" />
            <span className="text-sm w-1/3 text-[#878787]">
              Or sign in with
            </span>
            <div className="border border-[#878787] w-1/3" />
          </div>

          <div>
            <FcGoogle
              size={40}
              onClick={signinWithGoogleHandler}
              className="mx-auto border border-[#D6D6D6] rounded-full p-1 cursor-pointer"
            />
          </div>

          <div className="text-sm text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-[#FE8C00]">
              {" "}
              Register
            </Link>
          </div>
        </div>
      ) : (
        <LoginSuccessFloater onLoginSuccess={setLoginSuccess} />
      )}
    </>
  );
}
