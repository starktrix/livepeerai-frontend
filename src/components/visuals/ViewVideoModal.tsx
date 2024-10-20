import {
  ImageRequest,
  imageToVideo,
  saveVisuals,
  VideoRequest,
  VisualType,
} from "@/libs/livepeer-ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ViewVideoModal = ({
  episodeKey,
  sceneKey,
  actKey,
  imageUrl,
  setModalContent,
}: Record<any, any>) => {
  const [outputVidUrl, setOutputVidUrl] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const playVideo = async () => {
      if (outputVidUrl && videoRef.current) {
        try {
          await videoRef.current.load(); // Ensure video is loaded
          await videoRef.current.play(); // Play video once loaded
        } catch (error) {
          console.error("Error playing video:", error);
        }
      }
    };

    playVideo();
  }, [outputVidUrl]);

  return (
    <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-4 rounded-lg max-w-3xl w-full relative shadow-lg">
      {/* Close Button with Cancel Emoji at the Top */}
      <button
        onClick={() => setModalContent(null)}
        className="absolute top-4 right-4 text-white text-2xl transition duration-200 hover:text-[#ff5c7a]"
      >
        ❌
      </button>

      <h2 className="text-white text-xl font-semibold mb-3 text-center">
        `{episodeKey}-{sceneKey}-{actKey}`
      </h2>

      <div className="flex space-x-4">
        <div className="w-full">
          <div className="bg-[#1a1a2e] rounded-lg w-full h-96 shadow-md hover:shadow-lg transition-shadow duration-200">
            {" "}
            <video
              className="w-full h-full object-cover rounded-md"
              controls
              poster={imageUrl}
              ref={videoRef}
            >
              <source src={outputVidUrl || ""} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVideoModal;
