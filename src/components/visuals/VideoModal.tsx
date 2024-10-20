import {
  ImageRequest,
  imageToVideo,
  saveVisuals,
  VideoRequest,
  VisualType,
} from "@/libs/livepeer-ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VideoModal = ({
  episodeKey,
  sceneKey,
  actKey,
  actData,
  imageUrl,
  setModalContent,
  saveTempVideoUrl,
  parseNumberFromText,
  storyId,
}: Record<any, any>) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputVidUrl, setOutputVidUrl] = useState("");

  const episode = parseNumberFromText(episodeKey);
  const scene = parseNumberFromText(sceneKey);
  const act = parseNumberFromText(actKey);

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

  const handleImageToVideo = async () => {
    try {
      setIsGenerating(true);
      // Validate parsed numbers
      if (episodeKey === null || sceneKey === null || actKey === null) {
        console.error("Invalid metadata provided.");
        return;
      }

      const { data, success } = await imageToVideo(imageUrl, {
        //   ...aiSettingConfig,
      });
      if (success && data?.length > 0) {
        const vid_url = data[0].url; // Assuming the first image is used
        saveTempVideoUrl(episode, scene, act, vid_url);
        setOutputVidUrl(vid_url);
        console.log("Video URL saved successfully:", vid_url);
      } else {
        console.error("Failed to generate image.", data);
      }
    } catch (error) {
      console.error("Error in handleImageToVideo:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const [story_Id, setStoryId] = useState(storyId);

  const handleSave = async (type: VisualType, url: string) => {
    try {
      setIsSaving(true);
      let options: ImageRequest | VideoRequest | undefined;
      if (type === "image") {
        options = {
          episode,
          scene,
          act,
          image_url: url,
          type,
        } as ImageRequest;
      }
      if (type === "video") {
        options = {
          video_url: url,
          type,
        } as VideoRequest;
      }

      const { data, success } = await saveVisuals(
        story_Id,
        options as ImageRequest | VideoRequest
      );
    } catch (error) {
      console.error("Error in saving video:", error);
    } finally {
      setIsSaving(false);
    }
  };
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
        Generate Video
      </h2>

      <div className="flex space-x-4">
        {/* Left Column: Current Image */}
        <div className="w-1/3">
          <h3 className="text-white text-sm mb-1">Current Image</h3>
          <div className="bg-[#1a1a2e] rounded-lg w-full h-32 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Image
              src={imageUrl || "/images/img-placeholder.png"}
              alt="Current Image"
              width={120}
              height={80}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Right Column: Larger Image */}
        <div className="w-2/3">
          <h3 className="text-white text-sm mb-1">Output Video</h3>
          <div className="bg-[#1a1a2e] rounded-lg w-full h-96 shadow-md hover:shadow-lg transition-shadow duration-200">
            {" "}
            {/* <Image
              src={outputVidUrl || "/images/img-placeholder.png"}
              alt="Output Image"
              width={240}
              height={720}
              className="w-full h-full object-cover rounded-md"
            /> */}
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

      {/* Generate Video Button */}
      <div className="flex mt-4 space-x-4">
        <button
          disabled={isGenerating || isSaving}
          className="bg-[#e94560] text-white px-4 py-2 rounded w-[70%] transition duration-200 hover:bg-[#ff5c7a] cursor-pointer"
          onClick={() => handleImageToVideo()}
        >
          {isGenerating ? "Generating..." : "Generate Video"}
        </button>

        <button
          disabled={isSaving || isGenerating}
          className="border border-[#e94560] text-white px-4 py-2 rounded w-[30%] transition duration-200 hover:bg-[#e94560] cursor-pointer"
          onClick={() => handleSave("video", outputVidUrl)}
        >
          {isSaving ? "Saving..." : "Save Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
