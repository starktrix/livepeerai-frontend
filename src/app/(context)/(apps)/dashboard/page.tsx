"use client";

import useAxiosInstance from "@/libs/axiosHook";
import { useToken } from "@/libs/token-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const router = useRouter();
  const { token, store } = useToken();

  console.log("Token: ", token)

  const handleCreateNewStory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/stories`);

      // console.log(response.data);
      if (response.data.success) {
        store({ storyId: response.data.storyId });
        console.log("story Id persisted");
        setIsLoading(false);
        router.push(`/story/${response.data.storyId}/create/theme`);
      } else {
        console.error("Failed to generate theme");
      }
    } catch (error) {
      console.error("Error generating theme:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full flex justify-between pt-8 pr-8">
      <div className="p-8">
        {/* Welcome Message */}
        <h2 className="text-white text-2xl mb-6">Welcome back, Creator!</h2>

        {/* Quick Actions */}
        <div className="flex space-x-8">
          <div
            className="bg-[#e94560] w-40 h-24 rounded-lg p-4"
            onClick={handleCreateNewStory}
          >
            <p className="text-white text-lg">
              {isLoading ? "Creating new story..." : "Create New Story"}
            </p>
          </div>
          {/* <div className="bg-[#16213e] w-40 h-24 rounded-lg p-4">
                <p className="text-white text-lg">My NFTs</p>
              </div> */}
        </div>

        {/* Recent Stories */}
        <h3 className="text-white text-xl mt-8">Recent Stories</h3>

        <div className="space-y-6 mt-4">
          {/* Story 1 */}
          <div className="bg-[#16213e] w-[340px] h-24 rounded-lg p-4">
            <h4 className="text-white text-lg">The Lost City</h4>
            <p className="text-[#a4a4a4] text-sm">Last edited 2 days ago</p>
          </div>

          {/* Story 2 */}
          <div className="bg-[#16213e] w-[340px] h-24 rounded-lg p-4">
            <h4 className="text-white text-lg">Space Pirates</h4>
            <p className="text-[#a4a4a4] text-sm">Last edited 5 days ago</p>
          </div>
        </div>
      </div>
      {/* Activity Feed */}
      <div className="w-48 h-[380px] max-h-[calc(100vh-8rem)] bg-[#16213e] rounded-lg p-4">
        <h3 className="text-white text-lg mb-4">Activity Feed</h3>
      </div>
    </section>
  );
};

export default Dashboard;
