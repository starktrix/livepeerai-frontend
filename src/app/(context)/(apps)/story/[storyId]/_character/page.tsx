/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProgressStep from "@/components/ProgressStep";
import {
  ActionButton,
  OutlineButton,
  SolidButton,
} from "@/components/ui/Button";
import { Character } from "@/libs/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { characters as sampleCharacters } from "@/libs/example";
import { useToken } from "@/libs/token-context";
import useAxiosInstance from "@/libs/axiosHook";
import { useParams } from "next/navigation";

const CharacterUI = () => {
  const [characters, setCharacters] = useState<Character[]>(
    sampleCharacters.characters
  );
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { storyId } = useParams();
  const [characterId, setCharacterId] = useState<string | null>("");
  const axiosInstance = useAxiosInstance();
  const { store, getStore } = useToken();
  const [characterIdea, setCharacterIdea] = useState("");
  const [feedback, setFeedback] = useState("");


  useEffect(() => {
    const fetchCharacterData = async () => {
      if (storyId) {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(
            `/stories/characters/${storyId}`,
            {
              headers: {
                Authorization: `Bearer ${getStore("token")}`,
              },
            }
          );
          console.log("CHARACTER: ", response.data);
          if (response.data.success) {
            setCharacters(response.data.data.characters);
            setCharacterId(response.data.data.characterId);
            store({ characterId: response.data.data.characterId });
          } else {
            console.error("Failed to fetch character data");
          }
        } catch (error) {
          console.error("Error fetching character data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCharacterData();
  }, [storyId]);

  return (
    <>
      <ProgressStep step={3} />
      <section className="w-full h-full max-w-5xl mx-auto p-8 text-white">
        {/* Generated Character Display */}
        {
          /*characters.characters.length > 0*/ true && (
            <div className="mt-10">
              <h2 className="text-lg">Generated Character Details</h2>
              <div className="bg-[#16213e] rounded-lg mt-6 p-6">
                {/* Character Tabs */}
                <div className="flex space-x-4">
                  {characters.map((char, index) => (
                    <div
                      key={index}
                      className={`rounded-md p-2 w-28 text-center cursor-pointer ${
                        selectedCharacter === index
                          ? "bg-[#e94560]"
                          : "bg-[#1a1a2e]"
                      }`}
                      onClick={() => setSelectedCharacter(index)}
                    >
                      <span
                        className={
                          selectedCharacter === index
                            ? "text-white"
                            : "text-[#a4a4a4]"
                        }
                      >
                        Character {index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Character Details */}
                {characters[selectedCharacter] && (
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    {/* Left Column */}
                    <div>
                      <h2 className="text-xl">
                        {characters[selectedCharacter].name}
                      </h2>
                      {/* <p className="text-[#a4a4a4] mt-2">Role: Protagonist</p> */}

                      <div className="bg-[#1a1a2e] rounded-lg p-4 mt-4">
                        <h3 className="text-lg">Attributes</h3>
                        <p className="text-[#a4a4a4] mt-2">
                          Age: {characters[selectedCharacter].attributes.age}
                          <br />
                          Gender:{" "}
                          {characters[selectedCharacter].attributes.gender}
                          <br />
                          Appearance:{" "}
                          {characters[selectedCharacter].attributes.appearance}
                        </p>
                      </div>

                      <div className="bg-[#1a1a2e] rounded-lg p-4 mt-4">
                        <h3 className="text-lg">Background</h3>
                        <p className="text-[#a4a4a4] mt-2">
                          {characters[selectedCharacter].backstory}
                        </p>
                      </div>

                      <div className="bg-[#1a1a2e] rounded-lg p-4 mt-4">
                        <h3 className="text-lg">Motivations</h3>
                        <p className="text-[#a4a4a4] mt-2">
                          {characters[selectedCharacter].motivations}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="bg-[#1a1a2e] rounded-lg p-4 mt-4">
                        <h3 className="text-lg">Abilities</h3>
                        <ul className="list-disc ml-5 mt-2 space-y-2">
                          {characters[selectedCharacter].abilities.map(
                            (ability, index) => (
                              <li key={index} className="text-[#a4a4a4]">
                                {ability}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-[#1a1a2e] rounded-lg p-4 mt-4">
                        <h3 className="text-lg">Traits</h3>
                        <ul className="list-disc ml-5 mt-2 space-y-2">
                          {characters[selectedCharacter].traits.map(
                            (trait, index) => (
                              <li key={index} className="text-[#a4a4a4]">
                                {trait}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        }

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <div>
            <Link href={`/story/${storyId}/world`}>
              <OutlineButton text="Prev: World" />
            </Link>
            <Link href={`/story/${storyId}/plot`} className="ml-2">
              <SolidButton text="Next: Plot" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CharacterUI;
