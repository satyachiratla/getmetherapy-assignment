import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { FaUserCircle } from "react-icons/fa";

import AnalogClock from "../components/Tracking/AnalogClock";
import ShareButton from "../components/Tracking/ShareButton";
import SpeedSlider from "../components/Tracking/SpeedSlider";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const API_KEY = import.meta.env.VITE_QOUTE_API_KEY;
const QUOTE_API = import.meta.env.VITE_QUOTE_API;

export default function TrackingPage() {
  const query = useQuery();
  const speedParam = query.get("speed");
  const initialSpeed = speedParam ? parseFloat(speedParam) : 1;
  const [speed, setSpeed] = useState(initialSpeed);
  const [quote, setQuote] = useState("");
  const [fade, setFade] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userdata") || "{}");

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(QUOTE_API, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });

        const data = await response.json();
        setFade(false);
        setTimeout(() => {
          setQuote(data[0]?.quote);
          setFade(true);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuote();

    const quoteInterval = setInterval(fetchQuote, 5000);

    return () => clearInterval(quoteInterval);
  }, []);

  const logoutHandler = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="md:shadow-md min-h-screen h-full p-8 space-y-10 pt-10">
      <div className="relative">
        {userData.profilePic ? (
          <img
            src={userData.profilePic}
            alt="ProfilePic"
            className="rounded-full h-10 w-10 float-right cursor-pointer"
            onClick={toggleDropDown}
          />
        ) : (
          <FaUserCircle
            size={30}
            className="float-right cursor-pointer"
            onClick={toggleDropDown}
          />
        )}
        {showDropDown && (
          <ul className="z-10 absolute top-10 right-0 text-[12px] shadow-md p-4 rounded-xl">
            <li>{userData.name}</li>
            <li>{userData.email}</li>
            <li onClick={logoutHandler} className="cursor-pointer">
              Logout
            </li>
          </ul>
        )}
      </div>
      <div className="pt-20 space-y-10">
        <AnalogClock speed={speed} />
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
        <ShareButton speed={speed} />
      </div>
      <p
        className={`text-sm tracking-wide text-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {quote}
      </p>
    </div>
  );
}
