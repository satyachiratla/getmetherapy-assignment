import { useState } from "react";
import Burger1Svg from "../assets/images/image 39.png";
import Burger2Svg from "../assets/images/image 9.png";
import OnboardingCard from "../components/OnboardingCard";

export default function OnboardingPage() {
  const [onboardingCardIndex, setOnboardingCardIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = onboardingCardIndex < 3 ? onboardingCardIndex + 1 : 0;
    setOnboardingCardIndex(nextIndex);
  };

  return (
    <div className="relative">
      <img
        src={onboardingCardIndex === 0 ? Burger1Svg : Burger2Svg}
        alt="Burger"
        className="mx-auto"
      />
      <div className="absolute bottom-6 w-full px-10">
        {onboardingCardIndex === 0 && (
          <OnboardingCard
            cardIndex={onboardingCardIndex}
            handleNext={handleNext}
          />
        )}
        {onboardingCardIndex === 1 && (
          <OnboardingCard
            cardIndex={onboardingCardIndex}
            handleNext={handleNext}
          />
        )}
        {onboardingCardIndex === 2 && (
          <OnboardingCard
            cardIndex={onboardingCardIndex}
            handleNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
