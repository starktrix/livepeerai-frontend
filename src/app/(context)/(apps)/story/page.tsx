import Link from "next/link";

const MyStories = () => {
  const videos = [
    { id: 1, title: "Video Title 1" },
    { id: 2, title: "Video Title 2" },
    { id: 3, title: "Video Title 3" },
    { id: 4, title: "Video Title 4" },
    { id: 5, title: "Video Title 5" },
    { id: 6, title: "Video Title 6" },
    { id: 7, title: "Video Title 7" },
    { id: 8, title: "Video Title 8" },
    { id: 9, title: "Video Title 9" },
  ];
  return (
    <div className="bg-[#1a1a2e] min-h-screen text-white">
      {/* Header */}
      <header className="bg-[#1a1a2e] p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#e94560]"></h1>
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#0f3460] text-[#e94560] rounded-full px-4 py-2 focus:outline-none"
        />
      </header>

      {/* Video Grid */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Link href={`/story/${video.id}`}>
              <div
                key={video.id}
                className="bg-[#16213e] rounded-lg overflow-hidden"
              >
                <div className="relative aspect-video bg-black">
                  {/* Play button */}
                  <button className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[#e94560]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyStories;
