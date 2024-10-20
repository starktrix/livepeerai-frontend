const ViewVisualPlot = ({ episodeKey, sceneKey, actKey, actData, setModalContent }) => {
  return (
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-8 rounded-lg max-w-2xl w-full shadow-lg">
        <h2 className="text-white text-3xl font-semibold mb-4">
          {episodeKey.replace("_", " ")} - {sceneKey.replace("_", " ")} -{" "}
          {actKey.replace("_", " ")}
        </h2>

        <p className="text-white mb-6 text-lg">{actData.description}</p>

        <div className="mb-4">
          <h3 className="text-white text-xl mb-2 border-b-2 border-[#e94560] inline-block pb-1">
            Dialogue
          </h3>
          {actData?.dialogue?.map((d, index) => (
            <p key={index} className="text-white mb-2 mt-1">
              <strong className="text-[#e94560]">{d.character}:</strong>{" "}
              {d.line}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-white text-xl mb-2 border-b-2 border-[#e94560] inline-block pb-1">
            Emotional Cues
          </h3>
          {Object.entries(actData.emotional_cues).map(([character, cue]) => (
            <p key={character} className="text-white mb-2 mt-1">
              <strong className="text-[#e94560]">{character}:</strong> {cue}
            </p>
          ))}
        </div>

        <button
          onClick={() => setModalContent(null)}
          className="mt-6 bg-[#e94560] text-white px-6 py-2 rounded transition duration-200 hover:bg-[#ff5c7a] shadow-md"
        >
          Close
        </button>
      </div>
  );
};

export default ViewVisualPlot;
