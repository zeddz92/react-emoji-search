# React emoji search

Emoji picker displayed just like Whatsapp.

[Demo](https://moji-search.herokuapp.com/)

<div style="display: flex; align-items:center; height: 280px; justify-content: between; margin: 15px 0;">
<img src="https://user-images.githubusercontent.com/8311115/141772301-abb7acac-1170-460c-8c57-55b604b2e253.png" style=""/>
</div>

### Features:

- Large emoji library
- Customize with your own styles
- Emojis skin tones
- Recently used emojis support
- `light` and `dark` mode

<a href="https://www.buymeacoffee.com/zeddz" style="margin: 20px 0; display: block;">
  <img
    src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
    alt="Buy Me A Coffee"
    className="shadow-md h-9"
  />
</a>

# Installation

```
npm install react-emoji-search
```

# Usage

```javascript
import React, { useState } from "react";
import EmojiPicker from "react-emoji-search";

const Example = () => {
  const [emoji, setEmoji] = useState("😀️");

  return (
    <div>
      <div>{emoji}</div>
      <EmojiPicker
        variant="fullWidth"
        styles={{
          backgroundColor: "#772CE8",
          indicatorColor: "#69FFC3",
          fontColor: "white",
          tabsFontColor: "lightgrey",
          searchFontColor: "lightgrey",
        }}
        onEmojiClick={(emoji) => {
          setEmoji(emoji);
        }}
      />
    </div>
  );
};
```

### Properties

| Name         | Type     | Default     | Description                                                                       |
| :----------- | :------- | :---------- | :-------------------------------------------------------------------------------- |
| mode         | string   | light       | Switch between `dark` and `light`                                                 |
| onEmojiClick | Function | `undefined` | Function returning the picked emoji                                               |
| tabsVariant  | string   | default     | Set to `fullWidth` or `default`                                                   |
| styles       | Object   | `undefined` | Customize the picker elements such as indicator color, background color and fonts |

#### Styling

You can make the picker adjust to your needs with the following props:

```js
// styles
{
  backgroundColor: "...",
  indicatorColor: "...",
  fontColor: "...",
  tabsFontColor: "...",
  searchFontColor: "...",
}
```

When you set styles, it will override `dark` and `light` mode colors

# Future Features

- [ x ] Support skin tones on emojis
- [ ] Internationalization
- [ ] Choose emojis platform, like apple, facebook or twitter
- [ ] Optimize emojis search
- [ ] Support custom emojis
