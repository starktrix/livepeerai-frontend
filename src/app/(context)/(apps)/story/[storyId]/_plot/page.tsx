"use client";
import ProgressStep from "@/components/ProgressStep";
import {
  ActionButton,
  OutlineButton,
  SolidButton,
} from "@/components/ui/Button";
import useAxiosInstance from "@/libs/axiosHook";
import { SAMPLE_PLOT } from "@/libs/example";
import { useToken } from "@/libs/token-context";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlotDevelopmentUI = () => {
  const [plotData, setPlotData] = useState(SAMPLE_PLOT);
  const [plotIdea, setPlotIdea] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegLoading, setIsRegLoading] = useState(false);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [plotId, setPlotId] = useState<string | null>("");

  const axiosInstance = useAxiosInstance();
  const { getStore, store } = useToken();
  const { storyId } = useParams();

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

  // ============== UI SPECIFIC LOGIC ===============================
  // Initialize episode-scene-act state mapping
  const initializeState = () => {
    const state: Record<string, { scene: string; act: string }> = {};
    Object.entries(plotData).forEach(([episode, data]) => {
      const firstScene = Object.keys(data)[1]; // Skips the title key
      const firstAct = Object.keys(data[firstScene])[0];
      state[episode] = { scene: firstScene, act: firstAct };
    });
    return state;
  };

  // State for selected episode and its scene-act mapping
  const [selectedEpisode, setSelectedEpisode] = useState<string>(
    Object.keys(plotData)[0]
  );
  const [episodeState, setEpisodeState] = useState(initializeState);

  const handleEpisodeChange = (episode: string) => {
    setSelectedEpisode(episode);
  };

  const handleSceneChange = (scene: string) => {
    setEpisodeState((prev) => ({
      ...prev,
      [selectedEpisode]: { ...prev[selectedEpisode], scene },
    }));
  };

  const handleActChange = (act: string) => {
    setEpisodeState((prev) => ({
      ...prev,
      [selectedEpisode]: { ...prev[selectedEpisode], act },
    }));
  };

  const { scene: selectedScene, act: selectedAct } =
    episodeState[selectedEpisode];
  // ============================================================

  return (
    <>
      <ProgressStep step={4} />
      <section className="w-full h-full max-w-5xl mx-auto p-10 text-white">

        <div className="mt-10">
          <h1 className="text-xl text-white">AI Generated Plot</h1>
          <div className="bg-[#16213e] p-6 rounded-lg">
            {/* Episode Tabs */}
            <section className="flex space-x-4 border-b border-[#e94560]">
              {Object.entries(plotData).map(([episode, _], index) => (
                <div
                  key={index}
                  className={`rounded-md p-2 w-28 text-center cursor-pointer ${
                    selectedEpisode === episode
                      ? "bg-[#e94560]"
                      : "bg-[#1a1a2e]"
                  }`}
                  onClick={() => handleEpisodeChange(episode)}
                >
                  <span
                    className={`${
                      selectedEpisode === episode
                        ? "text-white"
                        : "text-[#a4a4a4]"
                    } text-sm`}
                  >
                    {episode}: {plotData[episode].title}
                  </span>
                </div>
              ))}
            </section>

            {/* Scene Tabs */}
            <section className="flex space-x-4 mt-4 border-b border-[#e94560]">
              {Object.keys(plotData[selectedEpisode] || {}).map(
                (scene, index) =>
                  scene !== "title" && (
                    <div
                      key={index}
                      className={`rounded-md p-2 w-28 text-center cursor-pointer ${
                        selectedScene === scene
                          ? "bg-[#e94560]"
                          : "bg-[#1a1a2e]"
                      }`}
                      onClick={() => handleSceneChange(scene)}
                    >
                      <span
                        className={
                          selectedScene === scene
                            ? "text-white"
                            : "text-[#a4a4a4]"
                        }
                      >
                        {scene}
                      </span>
                    </div>
                  )
              )}
            </section>

            {/* Act Tabs */}
            <section className="flex space-x-4 mt-4 border-b border-[#e94560]">
              {Object.keys(
                plotData[selectedEpisode]?.[selectedScene] || {}
              ).map((act, index) => (
                <div
                  key={index}
                  className={`rounded-md p-2 w-28 text-center cursor-pointer ${
                    selectedAct === act ? "bg-[#e94560]" : "bg-[#1a1a2e]"
                  }`}
                  onClick={() => handleActChange(act)}
                >
                  <span
                    className={
                      selectedAct === act ? "text-white" : "text-[#a4a4a4]"
                    }
                  >
                    {act}
                  </span>
                </div>
              ))}
            </section>

            {/* Act Details */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg mt-6">
              {/* Act Description */}
              <h3 className="text-lg text-white mb-4">
                {selectedAct}:{" "}
                {
                  plotData[selectedEpisode]?.[selectedScene]?.[selectedAct]
                    ?.description
                }
              </h3>

              {/* Dialogue Section */}
              <h4 className="text-md text-[#e94560] mb-2">Dialogue</h4>
              <div className="space-y-4">
                {plotData[selectedEpisode]?.[selectedScene]?.[
                  selectedAct
                ]?.dialogue?.map((line, index) => (
                  <div key={index} className="bg-[#16213e] p-4 rounded-md">
                    <p className="text-sm text-[#a4a4a4]">
                      <strong className="text-white">{line.character}</strong>{" "}
                      <em className="text-[#e94560]">to</em>{" "}
                      {line.speaking_to.join(", ")}
                    </p>
                    <p className="text-sm text-[#a4a4a4]">
                      <strong>Before Action:</strong> {line.before_action}
                    </p>
                    <p className="text-sm text-[#a4a4a4]">
                      <strong>Line:</strong> {line.line}
                    </p>
                    <p className="text-sm text-[#a4a4a4]">
                      <strong>After Action:</strong> {line.after_action}
                    </p>
                  </div>
                ))}
              </div>

              {/* Emotional Cues Section */}
              <h4 className="text-md text-[#e94560] mt-6 mb-2">
                Emotional Cues
              </h4>
              <div className="space-y-2">
                {Object.entries(
                  plotData[selectedEpisode]?.[selectedScene]?.[selectedAct]
                    ?.emotional_cues || {}
                ).map(([character, emotion], index) => (
                  <div key={index} className="bg-[#16213e] p-2 rounded-md">
                    <p className="text-sm text-white">
                      <strong>{character}:</strong> {emotion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="flex justify-between mt-4">
        
          <div>
            <Link href={`/story/${storyId}/character`}>
              <OutlineButton text="Prev: Character" />
            </Link>
            <Link href={`/story/${storyId}/visual`} className="ml-2">
              <SolidButton text="Next: Visuals" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlotDevelopmentUI;
