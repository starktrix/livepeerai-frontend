const ProgressStep = ({ step }: { step: number }) => {
  return (
    <div className="fixed top-0 py-7 px-20 flex items-center justify-between w-[calc(100%-13rem)] h-10 bg-[#16213e]">
      {/* <div className="absolute top-1 left-0 w-full h-[2px] bg-[#16213e]"></div> */}
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 ${
              step === 1 ? "bg-[#e94560]" : "bg-[#1a1a2e]"
            }  rounded-full`}
          ></div>
          <span
            className={`mt-2 text-xs ${
              step === 1 ? "text-[#e94560]" : "text-[#a4a4a4]"
            } `}
          >
            Concept
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 ${
              step === 2 ? "bg-[#e94560]" : "bg-[#1a1a2e]"
            }  rounded-full`}
          ></div>
          <span
            className={`mt-2 text-xs ${
              step === 2 ? "text-[#e94560]" : "text-[#a4a4a4]"
            } `}
          >
            World
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 ${
              step === 3 ? "bg-[#e94560]" : "bg-[#1a1a2e]"
            }  rounded-full`}
          ></div>
          <span
            className={`mt-2 text-xs ${
              step === 3 ? "text-[#e94560]" : "text-[#a4a4a4]"
            } `}
          >
            Characters
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 ${
              step === 4 ? "bg-[#e94560]" : "bg-[#1a1a2e]"
            }  rounded-full`}
          ></div>
          <span
            className={`mt-2 text-xs ${
              step === 4 ? "text-[#e94560]" : "text-[#a4a4a4]"
            } `}
          >
            Plot
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 ${
              step === 5 ? "bg-[#e94560]" : "bg-[#1a1a2e]"
            }  rounded-full`}
          ></div>
          <span
            className={`mt-2 text-xs ${
              step === 5 ? "text-[#e94560]" : "text-[#a4a4a4]"
            } `}
          >
            Visuals
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressStep;
