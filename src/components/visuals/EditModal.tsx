import {
  ImageRequest,
  imageToImage,
  imageUpscale,
  saveVisuals,
  VideoRequest,
  VisualType,
} from "@/libs/livepeer-ai";
import Image from "next/image";
import { useState } from "react";

const EditModal = ({
  episodeKey,
  sceneKey,
  actKey,
  actData,
  setModalContent,
  imageUrl,
  saveTempVisualUrl,
  parseNumberFromText,
  storyId,
}: Record<any, any>) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState("");
  const [editingImage, setEditingImage] = useState(imageUrl);
  const [outputImage, setOutputImage] = useState("");
  const [action, setAction] = useState<"imageToImage" | "upscale">(
    "imageToImage"
  );

  const episode = parseNumberFromText(episodeKey);
  const scene = parseNumberFromText(sceneKey);
  const act = parseNumberFromText(actKey);

  const handleImageToImage = async () => {
    try {
      setIsGenerating(true);
      // Validate parsed numbers
      if (episodeKey === null || sceneKey === null || actKey === null) {
        console.error("Invalid metadata provided.");
        return;
      }

      // Generate the image (hardcoded to one image per prompt)
      const { data, success } = await imageToImage(editingPrompt, imageUrl, {
        //   ...aiSettingConfig,
        numImagesPerPrompt: 1,
      });

      if (success && data?.length > 0) {
        const imageUrl_output = data[0].url; // Assuming the first image is used
        setOutputImage(imageUrl_output);
        // saveTempVisualUrl(episode, scene, act, imageUrl); // do not save, use the "Save Temp.."
        console.log("Image URL saved successfully:", imageUrl_output);
      } else {
        console.error("Failed to generate image.", data);
      }
    } catch (error) {
      console.error("Error in handleImageToImage:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // write logic
  const handleUpscale = async () => {
    try {
      setIsGenerating(true);
      // Validate parsed numbers
      if (episodeKey === null || sceneKey === null || actKey === null) {
        console.error("Invalid metadata provided.");
        return;
      }

      // Generate the image (hardcoded to one image per prompt)
      const { data, success } = await imageUpscale(editingPrompt, imageUrl, {
        //   ...aiSettingConfig,,
      });

      if (success && data?.length > 0) {
        const imageUrl_output = data[0].url; // Assuming the first image is used
        setOutputImage(imageUrl_output);
        // saveTempVisualUrl(episode, scene, act, imageUrl); // do not save, use the "Save Temp.."
        console.log("Image URL saved successfully:", imageUrl_output);
      } else {
        console.error("Failed to generate image.", data);
      }
    } catch (error) {
      console.error("Error in handleImageToImage:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlers = {
    imageToImage: handleImageToImage,
    upscale: handleUpscale,
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
      console.error("Error in saving image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-4 rounded-lg max-w-3xl w-full relative shadow-lg">
      <button
        onClick={() => setModalContent(null)}
        className="absolute top-4 right-4 text-white text-lg transition duration-200 hover:scale-105"
        title="Cancel"
      >
        ❌
      </button>

      <h2 className="text-white text-xl font-semibold mb-3 text-center">
        Edit Image
      </h2>

      {/* Action Selection */}
      <div className="mb-2">
        <h3 className="text-white text-sm mb-1">Select Action</h3>
        <div className="flex space-x-4">
          <label className="flex items-center text-white text-xs">
            <input
              type="radio"
              name="action"
              value="imageToImage"
              className="mr-1 accent-[#e94560]"
              checked={action === "imageToImage"}
              onChange={() => setAction("imageToImage")}
            />
            Image to Image
          </label>
          <label className="flex items-center text-white text-xs">
            <input
              type="radio"
              name="action"
              value="upscale"
              className="mr-1 accent-[#e94560]"
              checked={action === "upscale"}
              onChange={() => setAction("upscale")}
            />
            Upscale
          </label>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Left Column: Current Image */}
        <div className="w-1/2">
          <h3 className="text-white text-sm mb-1">Current Image</h3>
          <div className="bg-[#1a1a2e] rounded-lg w-full h-72 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Image
              src={editingImage || "/images/img-placeholder.png"}
              alt="Current Image"
              width={240}
              height={120}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Right Column: Output Image */}
        <div className="w-1/2">
          <h3 className="text-white text-sm mb-1">Output Image</h3>
          <div className="bg-[#1a1a2e] rounded-lg w-full h-72 shadow-md hover:shadow-lg transition-shadow duration-200">
            <Image
              src={outputImage || "/images/img-placeholder.png"} // Replace with actual output URL
              alt="Output Image"
              width={240}
              height={120}
              className="w-full h-full object-cover rounded-md"
              priority
            />
          </div>
        </div>
      </div>

      {/* Save Buttons below Output Image */}
      <div className="flex space-x-2 mt-2 justify-end">
        <button
          className="bg-transparent border border-[#e94560] text-[#e94560] px-4 py-1.5 rounded flex items-center space-x-2 transition duration-200 hover:bg-[#e94560] hover:text-white text-xs"
          onClick={() => {
            saveTempVisualUrl(episode, scene, act, outputImage);
            setEditingImage(outputImage);
            setOutputImage("");
          }}
        >
          <span>🕒</span>
          <span>Save Temporarily</span>
        </button>
        <button
          className="bg-[#e94560] text-white px-4 py-1.5 rounded flex items-center space-x-2 transition duration-200 hover:bg-[#ff5c7a] text-xs"
          onClick={() => handleSave("image", outputImage)}
        >
          <span>💾</span>
          <span>{isSaving ? "Saving..." : "Save"}</span>
        </button>
      </div>

      {/* Textarea for prompts */}
      <textarea
        className="w-full mt-3 p-2 bg-[#1a1a2e] text-white rounded border border-[#e94560] focus:outline-none focus:ring-2 focus:ring-[#e94560]"
        rows={4}
        placeholder="Enter image description or prompts..."
        value={editingPrompt}
        onChange={(e) => setEditingPrompt(e.target.value)}
      ></textarea>

      {/* Submit Button below Textarea */}
      <button
        disabled={isGenerating}
        className="bg-[#e94560] text-white px-4 py-2 rounded mt-2 w-full transition duration-200 hover:bg-[#ff5c7a] text-xs"
        onClick={() => handlers[action]()}
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </button>
    </div>
  );
};

export default EditModal;
