import { useLocation } from "react-router-dom";

type ShareButtonProps = {
  speed: number;
};

export default function ShareButton({ speed }: ShareButtonProps) {
  const location = useLocation();

  const handleShareClick = () => {
    const url = `${window.location.origin}${location.pathname}?speed=${speed}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (
    <button
      onClick={handleShareClick}
      className="bg-[#FE8C00] w-full p-2 text-white rounded-full"
    >
      Share
    </button>
  );
}
