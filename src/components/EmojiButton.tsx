import React, { FC } from "react";
import { BaseEmoji } from "unicode-emoji";

interface EmojiButtonProps {
  data: BaseEmoji;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
export const EmojiButton: FC<EmojiButtonProps> = ({ data, onClick }) => {
  return (
    <button
      className="text-3xl"
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {data.emoji}
    </button>
  );
};
