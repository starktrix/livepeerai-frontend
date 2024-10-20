"use client";

import ProgressStep from "@/components/ProgressStep";
import {
  ActionButton,
  OutlineButton,
  SolidButton,
} from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { world as sampleWorld } from "@/libs/example";
import { useParams } from "next/navigation";
import { useToken } from "@/libs/token-context";
import useAxiosInstance from "@/libs/axiosHook";

const WorldSetting = () => {
  const [activeTab, setActiveTab] = useState("geography");

  const [world, setWorld] = useState(sampleWorld);
  const [worldIdea, setWorldIdea] = useState("");
  const [feedback, setFeedback] = useState("");
  const [includeReturnImage, setIncludeReturnImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegLoading, setIsRegLoading] = useState(false);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [worldId, setWorldId] = useState<string | null>("");

  const axiosInstance = useAxiosInstance();
  const { getStore, store } = useToken();
  const { storyId } = useParams();


  // Fetch world data based on storyId when component loads
  useEffect(() => {
    const fetchWorldData = async () => {
      if (storyId) {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/stories/worlds/${storyId}`,
            {
              headers: {
                Authorization: `Bearer ${getStore("token")}`,
              },
            }
          );
          console.log(response.data)
          if (response.data.success) {
            setWorld(response.data.data.world);
            setWorldId(response.data.data.worldId);
            store({ worldId: response.data.data.worldId });
          } else {
            console.error("Failed to fetch world data");
          }
        } catch (error) {
          console.error("Error fetching world data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchWorldData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId])

  const renderTabContent = () => {
    switch (activeTab) {
      case "geography":
        return (
          <div>
            <h3 className="text-white font-semibold mb-2">
              Climate: {world.geography.climate}
            </h3>
            <h3 className="text-white font-semibold mb-2">Landforms:</h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.geography.landforms.map((landform, index) => (
                <li key={index}>{landform}</li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-4 mb-2">Seasons:</h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.geography.seasons.map((season, index) => (
                <li key={index}>
                  {season}:{" "}
                  {world.geography.seasonal_variation[season.toLowerCase()]}
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-4 mb-2">
              Natural Resources:
            </h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.geography.natural_resources.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-4 mb-2">
              Natural Disasters:
            </h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.geography.natural_disasters.map((disaster, index) => (
                <li key={index}>{disaster}</li>
              ))}
            </ul>
          </div>
        );
      case "culture":
        return (
          <div>
            <h3 className="text-white font-semibold mb-2">Cultures:</h3>
            {world.cultural_diversity.cultures.map((culture, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-[#e94560] font-semibold">{culture.name}</h4>
                <p className="text-[#a4a4a4]">
                  <span className="font-semibold">Customs:</span>{" "}
                  {culture.customs}
                </p>
                <p className="text-[#a4a4a4]">
                  <span className="font-semibold">Traditions:</span>{" "}
                  {culture.traditions}
                </p>
              </div>
            ))}
            <h3 className="text-white font-semibold mt-4 mb-2">Languages:</h3>
            {Object.entries(world.cultural_diversity.languages).map(
              ([culture, languages]) => (
                <p key={culture} className="text-[#a4a4a4]">
                  <span className="font-semibold">{culture}:</span>{" "}
                  {Array.isArray(languages) ? languages.join(", "): languages}
                </p>
              )
            )}
            <h3 className="text-white font-semibold mt-4 mb-2">
              Social Structures:
            </h3>
            {Object.entries(world.cultural_diversity.social_structures).map(
              ([culture, structure]) => (
                <p key={culture} className="text-[#a4a4a4]">
                  <span className="font-semibold">{culture}:</span> {structure}
                </p>
              )
            )}
            <h3 className="text-white font-semibold mt-4 mb-2">
              Belief Systems:
            </h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.cultural_diversity.belief_systems.map((belief, index) => (
                <li key={index}>{belief}</li>
              ))}
            </ul>
          </div>
        );
      case "attributes":
        return (
          <div>
            {Object.entries(world.attributes).map(([key, value]) => (
              <div key={key} className="mb-4">
                <h3 className="text-white font-semibold mb-2">
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </h3>
                <p className="text-[#a4a4a4]">{value}</p>
              </div>
            ))}
          </div>
        );
      case "key_locations":
        return (
          <div>
            {world.key_locations.map((location, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-[#e94560] font-semibold">
                  {location.name}
                </h3>
                <p className="text-[#a4a4a4]">
                  <span className="font-semibold">Description:</span>{" "}
                  {location.description}
                </p>
                <p className="text-[#a4a4a4]">
                  <span className="font-semibold">Location:</span>{" "}
                  {location.location}
                </p>
                <p className="text-[#a4a4a4]">
                  <span className="font-semibold">Significance:</span>{" "}
                  {location.significance}
                </p>
              </div>
            ))}
          </div>
        );
      case "history":
        return (
          <div>
            <h3 className="text-white font-semibold mb-2">World History:</h3>
            <p className="text-[#a4a4a4] whitespace-pre-line">
              {world.history}
            </p>
            <h3 className="text-white font-semibold mt-4 mb-2">
              Current Year: {world.year}
            </h3>
          </div>
        );
      case "description":
        return (
          <div>
            <h3 className="text-white font-semibold mb-2">
              World Description:
            </h3>
            <p className="text-[#a4a4a4] whitespace-pre-line">
              {world.description}
            </p>
            <h3 className="text-white font-semibold mt-4 mb-2">Genres:</h3>
            <ul className="list-disc pl-5 text-[#a4a4a4]">
              {world.genre.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ProgressStep step={2} />
      <div className="bg-[#0f172a] min-h-screen text-white p-8">
        <div className="max-w-5xl mx-auto">

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Generated World Details
            </h2>
            <div className="p-5 bg-[#16213e] rounded-lg">
              <div className="flex flex-wrap mb-4">
                {[
                  "geography",
                  "culture",
                  "attributes",
                  "key_locations",
                  "history",
                  "description",
                ].map((tab) => (
                  <button
                    key={tab}
                    className={`w-[100px] h-[30px] rounded-md text-center mr-2 mb-2 ${
                      activeTab === tab
                        ? "bg-[#e94560] text-white"
                        : "bg-[#1a1a2e] text-[#a4a4a4]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </button>
                ))}
              </div>

              <div className="p-5 bg-[#1a1a2e] rounded-lg">
                {renderTabContent()}
              </div>
            </div>
          </div>


          <div className="flex justify-between mt-4">
            <div>
              <Link href={`/story/${storyId}/theme`}>
                <OutlineButton text="Prev: Theme" />
              </Link>
              <Link href={`/story/${storyId}/character`} className="ml-2">
                <SolidButton text="Next: Character" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorldSetting;
