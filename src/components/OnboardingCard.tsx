import { Link } from "react-router-dom";
import RightArrowSvg from "../assets/svgs/right-arrow.svg";

type OnboardingCardProps = {
  cardIndex: number;
  handleNext: () => void;
};

export default function OnboardingCard({
  cardIndex,
  handleNext,
}: OnboardingCardProps) {
  return (
    <article className="relative bg-[#FE8C00] rounded-[40px] p-5 h-96 text-white text-center">
      <h2 className="text-2xl font-semibold tracking-wide px-5">
        We serve incomparable delicacies
      </h2>
      <p className="text-sm py-4 px-2">
        All the best restaurants with their top menu waiting for you, they
        cant’t wait for your order!!
      </p>
      <div className="flex justify-center items-center gap-2">
        <div
          className={` w-8 h-1 p-1 rounded-3xl ${
            cardIndex === 0 ? "bg-white" : "bg-gray-300"
          }`}
        />
        <div
          className={` w-8 h-1 p-1 rounded-3xl ${
            cardIndex === 1 ? "bg-white" : "bg-gray-300"
          }`}
        />
        <div
          className={` w-8 h-1 p-1 rounded-3xl ${
            cardIndex === 2 ? "bg-white" : "bg-gray-300"
          }`}
        />
      </div>
      {cardIndex < 2 ? (
        <div className="flex items-center justify-between absolute bottom-6 left-0 w-full px-8">
          <Link to="/login">Skip</Link>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <Link to="/login">
          <img src={RightArrowSvg} alt="Arrow" className="mx-auto mt-8" />
        </Link>
      )}
    </article>
  );
}
