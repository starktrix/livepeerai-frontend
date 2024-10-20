/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProgressStep from "@/components/ProgressStep";
import { ActionButton, SolidButton } from "@/components/ui/Button";
import EditModal from "@/components/visuals/EditModal";
import VideoModal from "@/components/visuals/VideoModal";
import ViewVideoModal from "@/components/visuals/ViewVideoModal";
import ViewVisualPlot from "@/components/visuals/ViewVisualPlot";
import useAxiosInstance from "@/libs/axiosHook";
import { SAMPLE_PLOT } from "@/libs/example";
import { textToImage } from "@/libs/livepeer-ai";
import { useToken } from "@/libs/token-context";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StoryComponent = () => {
  // const [activeEpisode, setActiveEpisode] = useState("episode_one");
  // const [activeScene, setActiveScene] = useState("scene_one");
  const [modalContent, setModalContent] = useState<any>(null);
  const [plotData, setPlotData] = useState(SAMPLE_PLOT);
  const [plotId, setPlotId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxiosInstance();
  const { getStore, store } = useToken();
  const aiSettingConfig = {};
  const { storyId } = useParams();

  // New state for managing episodes independently
  const [selectedEpisode, setSelectedEpisode] = useState(
    Object.keys(SAMPLE_PLOT)[0]
  );
  const [episodeState, setEpisodeState] = useState(() => {
    const initialState = {};
    Object.keys(SAMPLE_PLOT).forEach((episode) => {
      initialState[episode] = {
        scene:
          Object.keys(SAMPLE_PLOT[episode]).find((key) => key !== "title") ||
          "",
        act: "",
      };
    });
    return initialState;
  });

  useEffect(() => {
    const fetchPlotData = async () => {
      if (storyId) {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/stories/plots/${storyId}`,
            {
              headers: {
                Authorization: `Bearer ${getStore("token")}`,
              },
            }
          );
          console.log(response.data);
          if (response.data.success) {
            setPlotData(response.data.data.plot);
            setPlotId(response.data.data.plotId);
            store({ plotId: response.data.data.plotId });

            // Initialize episodeState with the fetched data
            const initialState = {};
            Object.keys(response.data.data.plot).forEach((episode) => {
              initialState[episode] = {
                scene:
                  Object.keys(response.data.data.plot[episode]).find(
                    (key) => key !== "title"
                  ) || "",
                act: "",
              };
            });
            setEpisodeState(initialState);
            setSelectedEpisode(Object.keys(response.data.data.plot)[0]);
          } else {
            console.error("Failed to fetch plot data");
          }
        } catch (error) {
          console.error("Error fetching plot data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPlotData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  const handleEpisodeChange = (episode: string) => {
    setSelectedEpisode(episode);
  };

  const handleSceneChange = (scene: string) => {
    setEpisodeState((prev) => ({
      ...prev,
      [selectedEpisode]: { ...prev[selectedEpisode], scene },
    }));
  };

  // ==========================================================

  const parseNumberFromText = (text: string): number | null => {
    const mapping: Record<string, number> = {
      episode_one: 1,
      episode_two: 2,
      episode_three: 3,
      scene_one: 1,
      scene_two: 2,
      scene_three: 3,
      act_one: 1,
      act_two: 2,
      act_three: 3,
    };
    return mapping[text.toLowerCase()] ?? null;
  };

  const saveTempVisualUrl = (
    episode: number,
    scene: number,
    act: number,
    url: string
  ) => {
    // Retrieve the temp_url store
    let tempVisualUrl = JSON.parse((getStore("temp_url") as string) || "{}");

    // Ensure nested objects exist
    if (!tempVisualUrl[episode]) tempVisualUrl[episode] = {};
    if (!tempVisualUrl[episode][scene]) tempVisualUrl[episode][scene] = {};

    // Save the URL to the appropriate nested location
    tempVisualUrl[episode][scene][act] = url;

    // Store the updated temp_url object
    store({ temp_url: JSON.stringify(tempVisualUrl) });
  };

  const saveTempVideoUrl = (
    episode: number,
    scene: number,
    act: number,
    url: string
  ) => {
    // Retrieve the temp_url store
    let tempVisualUrl = JSON.parse(
      (getStore("temp_vid_url") as string) || "{}"
    );

    // Ensure nested objects exist
    if (!tempVisualUrl[episode]) tempVisualUrl[episode] = {};
    if (!tempVisualUrl[episode][scene]) tempVisualUrl[episode][scene] = {};

    // Save the URL to the appropriate nested location
    tempVisualUrl[episode][scene][act] = url;

    // Store the updated temp_url object
    store({ temp_vid_url: JSON.stringify(tempVisualUrl) });
  };

  const getTempVisualUrl = (
    episode: number,
    scene: number,
    act: number
  ): string | null => {
    const tempVisualUrl = JSON.parse((getStore("temp_url") as string) || "{}");
    return tempVisualUrl?.[episode]?.[scene]?.[act] || null;
  };

  const getTempVideoUrl = (
    episode: number,
    scene: number,
    act: number
  ): string | null => {
    const tempVisualUrl = JSON.parse(
      (getStore("temp_vid_url") as string) || "{}"
    );
    return tempVisualUrl?.[episode]?.[scene]?.[act] || null;
  };

  const combineEpisodeSceneAct = (
    episode: string,
    scene: string,
    act: string
  ): string => {
    return `${episode}.${scene}.${act}`;
  };

  const [tti, setTTI] = useState(""); // use by both handles, just for temp storage
  //used byimage to image, to decide if user wants to swap with current image
  // or keep newly generated one

  const [editingImage, setEditingImage] = useState("");
  const [editingPrompt, setEditingPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTextToImage = async (
    plot_prompt: string,
    metadata: { episode: string; scene: string; act: string }
  ) => {
    try {
      setTTI(
        combineEpisodeSceneAct(metadata.episode, metadata.scene, metadata.act)
      );
      // Parse episode, scene, and act from strings to numbers
      const episode = parseNumberFromText(metadata.episode);
      const scene = parseNumberFromText(metadata.scene);
      const act = parseNumberFromText(metadata.act);

      // Validate parsed numbers
      if (episode === null || scene === null || act === null) {
        console.error("Invalid metadata provided.");
        return;
      }

      console.log(plot_prompt, metadata);

      // Generate the image (hardcoded to one image per prompt)
      const { data, success } = await textToImage(plot_prompt, {
        ...aiSettingConfig,
        numImagesPerPrompt: 1,
      });

      if (success && data?.length > 0) {
        const imageUrl = data[0].url; // Assuming the first image is used
        saveTempVisualUrl(episode, scene, act, imageUrl);
        console.log("Image URL saved successfully:", imageUrl);
      } else {
        console.error("Failed to generate image.", data);
      }
    } catch (error) {
      console.error("Error in handleTextToImage:", error);
    } finally {
      setTTI("");
    }
  };

  // ================ UI SPECIFIC ==============================

  const openViewModal = (episodeKey, sceneKey, actKey) => {
    const actData = plotData[episodeKey][sceneKey][actKey];
    setModalContent(
      <ViewVisualPlot
        episodeKey={episodeKey}
        sceneKey={sceneKey}
        actKey={actKey}
        actData={actData}
        setModalContent={setModalContent}
      />
    );
  };

  const openVideoModal = (episodeKey, sceneKey, actKey) => {
    //   this will be gotteh from db
    const actData = plotData[episodeKey][sceneKey][actKey];
    const imageUrl = getTempVisualUrl(
      parseNumberFromText(episodeKey)!,
      parseNumberFromText(episodeState[episodeKey].scene)!,
      parseNumberFromText(actKey)!
    );

    setModalContent(
      <ViewVideoModal
        episodeKey={episodeKey}
        sceneKey={sceneKey}
        actKey={actKey}
        imageUrl={imageUrl}
        setModalContent={setModalContent}
      />
    );
  };

  // ========================================================

  return (
    <>
      <section className="w-full h-full max-w-5xl mx-auto p-10">
        {/* Episode Tabs */}
        <div className="flex mt-4 bg-[#16213e] rounded-lg">
          {Object.keys(plotData).map((episode) => (
            <button
              key={episode}
              className={`px-4 py-2 ${
                selectedEpisode === episode
                  ? "bg-[#e94560] text-white"
                  : "text-gray-400"
              } rounded-lg`}
              onClick={() => handleEpisodeChange(episode)}
            >
              {plotData[episode].title}
            </button>
          ))}
        </div>

        {/* Scene Tabs */}
        <div className="flex mt-4 bg-[#16213e] rounded-lg">
          {Object.keys(plotData[selectedEpisode])
            .filter((key) => key !== "title")
            .map((scene) => (
              <button
                key={scene}
                className={`px-4 py-2 ${
                  episodeState[selectedEpisode].scene === scene
                    ? "bg-[#e94560] text-white"
                    : "text-gray-400"
                } rounded-lg`}
                onClick={() => handleSceneChange(scene)}
              >
                {scene.replace("_", " ").charAt(0).toUpperCase() +
                  scene.slice(1)}
              </button>
            ))}
        </div>

        {/* Acts Content */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(
            plotData[selectedEpisode][episodeState[selectedEpisode].scene]
          ).map(([actKey, actData]) => {
            const combinedKey = combineEpisodeSceneAct(
              selectedEpisode,
              episodeState[selectedEpisode].scene,
              actKey
            );
            const isLoading = tti === combinedKey;
            return (
              <div
                key={actKey}
                className="bg-[#16213e] rounded-lg p-4 flex flex-col h-full"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="text-white text-lg">
                    {actKey.replace("_", " ").charAt(0).toUpperCase() +
                      actKey.slice(1)}
                  </h3>
                </div>
                <div className="bg-[#1a1a2e] rounded-lg w-full h-80 max-h-80 mb-2 ">
                  <Image
                    src={
                      getTempVisualUrl(
                        parseNumberFromText(selectedEpisode)!,
                        parseNumberFromText(
                          episodeState[selectedEpisode].scene
                        )!,
                        parseNumberFromText(actKey)!
                      ) || "/images/img-placeholder.png"
                    }
                    alt={`Placeholder for ${selectedEpisode} ${episodeState[selectedEpisode].scene} ${actKey}`}
                    width={320}
                    height={160}
                    className="w-full h-full object-cover rounded-md"
                    // width={640}
                    // height={320}
                  />
                </div>
                <p className="text-white text-sm flex-grow">
                  {actData.description}
                </p>
                <div className=" flex justify-between mt-2">
                  <button
                    className="bg-[#1a1a2e] rounded-lg w-14 h-14 text-white text-xl flex items-center justify-center"
                    title="View Details"
                    onClick={() =>
                      openViewModal(
                        selectedEpisode,
                        episodeState[selectedEpisode].scene,
                        actKey
                      )
                    }
                  >
                    👁️
                  </button>

                  <button
                    className="bg-[#1a1a2e] rounded-lg w-14 h-14 text-white text-xl flex items-center justify-center"
                    title="Convert Image to Video"
                    onClick={() =>
                      openVideoModal(
                        selectedEpisode,
                        episodeState[selectedEpisode].scene,
                        actKey
                      )
                    }
                  >
                    🎥
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {modalContent}
          </div>
        )}

        {/* Video Preview Section */}
        <div className="bg-[#16213e] rounded-lg mt-6 p-4">
          <span className="text-white text-lg">Video Preview</span>
          <div className="flex mt-4">
            <div className="bg-[#1a1a2e] rounded-lg w-1/2 h-44 relative">
              <div className="w-full h-full bg-black rounded-lg">
                <video
                  className="w-full h-full object-contain rounded-lg"
                  controls
                >
                  <source src={"video_url"} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryComponent;
