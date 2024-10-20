/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProgressStep from "@/components/ProgressStep";
import { ActionButton, SolidButton } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { theme as sampleTheme } from "@/libs/example";
import { useParams } from "next/navigation";
import useAxiosInstance from "@/libs/axiosHook";
import { useToken } from "@/libs/token-context";

const ViewStoryTheme = () => {
  const [theme, setTheme] = useState(sampleTheme);
  const [storyIdea, setStoryIdea] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [includeReturnImage, setIncludeReturnImage] = useState(false);
  const { storyId } = useParams();
  const [themeId, setThemeId] = useState<string | null>("");
  const axiosInstance = useAxiosInstance();
  const { store, getStore } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      if (storyId) {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/stories/themes/${storyId}`,
            {
              headers: {
                Authorization: `Bearer ${getStore("token")}`,
              },
            }
          );
          console.log("THEME: ", response.data);
          if (response.data.success) {
            setTheme(response.data.data.theme);
            setThemeId(response.data.data.themeId);
            store({ themeId: response.data.data.themeId });
          } else {
            console.error("Failed to fetch theme data");
          }
        } catch (error) {
          console.error("Error fetching theme data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  return (
    <>
      <ProgressStep step={1} />
      <section className="bg-[#0f172a] min-h-screen text-white p-8 ">
        <div className="max-w-5xl mx-auto">
          {/* AI Generated Concept */}
          <div className="mb-8 bg-[#16213e] rounded-lg p-6 mt-10">
            <h2 className="text-lg font-semibold mb-4">AI Generated Concept</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-semibold mb-2">Core Theme:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.core_theme.join(", ")}
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Genres:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.genres.join(", ")}
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Premise:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.premise}
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Conflict:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  <p className="border-b border-[##16213e] mb-1">
                    <strong>External:</strong> {theme.conflict.external}
                  </p>
                  <p className="border-b border-[##16213e] mb-1">
                    <strong>Internal:</strong> {theme.conflict.internal}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Emotional Arc:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.emotional_arc}
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Narrative Hooks:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  <ul className="list-disc pl-5">
                    {theme.narrative_hooks.map((hook, index) => (
                      <li key={index}>{hook}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Intended Audience:
                </h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.intended_audience}
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Episode Themes:</h3>
                <div className="bg-[#1a1a2e] p-4 rounded-md text-[#a4a4a4]">
                  {theme.episode_themes.map((episode, index) => (
                    <div
                      key={index}
                      className="mb-2 border-b border-[##16213e]"
                    >
                      <p>
                        <strong>Episode {episode.episode}:</strong>{" "}
                        {episode.theme}
                      </p>
                      <p className="text-sm">{episode.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link href={`/story/${storyId}/world`} className="ml-2">
              <SolidButton text="Next: World" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewStoryTheme;
