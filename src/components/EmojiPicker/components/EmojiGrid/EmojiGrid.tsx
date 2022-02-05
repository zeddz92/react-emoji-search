import React, { FC, useContext } from "react";

import { EmojiPickerContext } from "../../../../contexts/EmojiPickerContext";
import { Emoji } from "../../../../types/emoji";
import { Button } from "../../../Button";
import { Emoji as EmojiComponent } from "../../../EmojiPicker/components/Emoji";

interface EmojiGridProps {
  data: Emoji[];
}
export const EmojiGrid: FC<EmojiGridProps> = ({ data }) => {
  const {
    onEmojiClick,
    onEmojiLongPress,
    skinTones,
    emojiSpacing,
    emojiSize,
    sheetSize,
    quality,
    set,
  } = useContext(EmojiPickerContext);
  return (
    <div
      data-testid="emoji-grid"
      className="emoji-grid"
      style={{
        gap: `${emojiSpacing}px`,
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${emojiSize}px, 100%), 1fr))`,
      }}
    >
      {data.map((data) => (
        <Button
          key={`emoji-${data.native}`}
          onLongPress={(e) => onEmojiLongPress && onEmojiLongPress(e, data)}
          onClick={(e) => onEmojiClick && onEmojiClick(e, data)}
        >
          <EmojiComponent
            size={emojiSize}
            sheetSize={sheetSize}
            set={set}
            quality={quality}
            data={skinTones[data.native] || data}
          />
        </Button>
      ))}
    </div>
  );
};
