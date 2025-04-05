import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-40">
      <div className="bg-white h-screen flex items-center justify-center">
        <BeatLoader
          size={15}
          color="#FF4907"
          speedMultiplier={2}
          loading={true}
        />
      </div>
    </div>
  );
}
