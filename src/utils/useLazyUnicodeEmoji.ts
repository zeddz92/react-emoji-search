import { useEffect, useState } from "react";
import { BaseEmoji, GroupedBy } from "unicode-emoji";

import { EMOJIS_VERSION, LOCAL_STORAGE_RECENT } from "../constants";
import { getItem } from "./useLocalStorage";

export const useLazyUnicodeEmoji = () => {
  const [groupedEmojis, setGroupedEmojis] =
    useState<Record<GroupedBy | "recent", BaseEmoji[] | undefined>>();

  const [baseEmojis, setBaseEmojis] = useState<BaseEmoji[] | undefined>();

  useEffect(() => {
    import("unicode-emoji").then((unicodeEmoji) => {
      const recentEmojis = getItem<BaseEmoji[]>(LOCAL_STORAGE_RECENT);
      const emojis = unicodeEmoji.getEmojisGroupedBy("category", {
        versionAbove: EMOJIS_VERSION,
      });

      console.log(emojis);

      setGroupedEmojis({
        recent: recentEmojis || undefined,
        ...emojis,
        "face-emotion": [...emojis["face-emotion"], ...emojis["person-people"]],
      });

      setBaseEmojis(unicodeEmoji.getEmojis({ versionAbove: EMOJIS_VERSION }));
    });
  }, []);

  return { groupedEmojis, baseEmojis };
};
