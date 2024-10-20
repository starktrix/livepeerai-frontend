import React from "react";

export const SolidButton = ({ text }: { text: string }) => {
  return (
    <button className="px-4 py-2 bg-[#e94560] text-white rounded-md hover:bg-[#d63d57]">
      {text}
    </button>
  );
};

export const OutlineButton = ({ text }: { text: string }) => {
  return (
    <button className="px-4 py-2 border border-[#e94560] text-[#e94560] rounded-md hover:bg-[#e94560] hover:text-white">
      {text}
    </button>
  );
};

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  highlight?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onClick = () => {},
  highlight = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        highlight ? "bg-[#e94560]" : "bg-[#1a1a2e]"
      } rounded-md w-32 h-10 text-white text-sm px-2`}
    >
      {text}
    </button>
  );
};
