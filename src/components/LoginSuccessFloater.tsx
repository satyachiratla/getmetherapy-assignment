import { Link } from "react-router-dom";

import Burger1Svg from "../assets/svgs/burger-1.svg";
import SuccessSvg from "../assets/svgs/success.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

type LoginSuccessFloaterProps = {
  onLoginSuccess: (value: boolean) => void;
};

export default function LoginSuccessFloater({
  onLoginSuccess,
}: LoginSuccessFloaterProps) {
  const logoutHandler = async () => {
    await signOut(auth);
    localStorage.clear();
    onLoginSuccess(false);
  };

  return (
    <div className="relative text-center">
      <img src={Burger1Svg} alt="Burger" className="mx-auto" />
      <div className="bg-white p-5 absolute top-[50%] bottom-0 left-0 right-0 mx-1 rounded-t-2xl space-y-5 animate-floatUp">
        <img src={SuccessSvg} alt="Success" className="mx-auto h-40 w-40" />
        <h2 className="text-2xl font-medium">Login Successful</h2>
        <p>
          <Link to="/tracking">
            <button className="bg-[#FE8C00] w-full p-2 text-white rounded-full">
              Go to Tracking Screen
            </button>
          </Link>
        </p>
        <button onClick={logoutHandler} className="text-[#878787]">
          Logout
        </button>
      </div>
    </div>
  );
}
