import React, { FC } from "react";

interface EmojiGridProps {
  emojiSize: number;
  emojiSpacing: number;
}

export const EmojiGrid: FC<EmojiGridProps> = ({
  emojiSize,
  emojiSpacing,
  children,
}) => {
  return (
    <div
      data-testid="emoji-grid"
      className="emoji-grid"
      style={{
        gap: `${emojiSpacing}px`,
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${emojiSize}px, 100%), 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
