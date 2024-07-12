import { ChangeEvent } from "react";

type SpeedSlider = {
  speed: number;
  setSpeed: (value: number) => void;
};

export default function SpeedSlider({ speed, setSpeed }: SpeedSlider) {
  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  return (
    <div className="my-[20px] flex items-center gap-2">
      <label className="w-1/3">Speed: {speed.toFixed(1)}x</label>
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={speed}
        onChange={handleSliderChange}
        className="text-red-300 w-2/3"
      />
    </div>
  );
}
