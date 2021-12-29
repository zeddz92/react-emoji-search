# React emoji search

Emoji picker displayed just like Whatsapp.

[Demo](https://moji-search.herokuapp.com/)

<div style="display: flex; align-items:center; height: 320px; justify-content: between; margin: 15px 0;">
<img src="https://user-images.githubusercontent.com/8311115/147536323-e3324649-6266-41b0-be56-5b0128b42d8b.gif" style=""/>
</div>

### Features:

- Fully customizable
- Emojis skin tones
- Recently used emojis support
- Emoji sets: `facebook`, `apple`, `google` and `twitter`
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

## Emoji Picker

```javascript
import React from "react";
import { EmojiPicker, Emoji } from "react-emoji-search";

<EmojiPicker set="apple" />
<EmojiPicker onEmojiClick={(emoji) => setEmoji(emoji)} />
<EmojiPicker
  styles={{
    backgroundColor: "#772CE8",
    indicatorColor: "#69FFC3",
    fontColor: "white",
    tabsFontColor: "lightgrey",
    searchFontColor: "lightgrey",
    searchBackgroundColor: "lightgrey",
    variationPickerBackgroundColor: "red",
  }}
/>
```

### Properties

| Name         | Type     | Default     | Description                                                                       |
| :----------- | :------- | :---------- | :-------------------------------------------------------------------------------- |
| set          | string   | apple       | Emoji icon set: `apple`,`facebook`,`twitter`,`google`, `native`                   |
| quality      | string   | clean       | quality of the spreadsheet; `128`,`256`,`clean`                                   |
| mode         | string   | dark        | Switch between `dark` and `light`                                                 |
| onEmojiClick | Function | `undefined` | Returns the native emoji                                                          |
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
  variationPickerBackgroundColor: "...",
}
```

### Sprite Sheets

The sprite sheets comes from `jsDelivr` thanks to [emoji-datasource](https://www.npmjs.com/package/emoji-datasource) package.

You can check the used sprite sheets through these links:

- [apple](https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/)
- [facebook](https://cdn.jsdelivr.net/npm/emoji-datasource-facebook@7.0.2/img/facebook/)
- [twitter](https://cdn.jsdelivr.net/npm/emoji-datasource-twitter@7.0.2/img/twitter/)
- [google](https://cdn.jsdelivr.net/npm/emoji-datasource-google@7.0.2/img/google/)

## Emoji

Get emoji from native. This component will attempt to find
the emoji and render from the specified set. If not found it will render interrogation emoji (❓).

```javascript
import React from "react";
import { Emoji } from "react-emoji-search";

<Emoji unicode="✌🏽" />
<Emoji unicode="🥸" set="facebook" size={24} />
<Emoji unicode="👀" set="twitter" quality="256" />
```

### Properties

| Name    | Type   | Default | Description                                                     |
| :------ | :----- | :------ | :-------------------------------------------------------------- |
| unicode | string |         | Native emoji                                                    |
| size    | number | 32      | Width and height of the emoji                                   |
| set     | string | apple   | Emoji icon set: `apple`,`facebook`,`twitter`,`google`, `native` |
| quality | string | clean   | quality of the spreadsheet; `128`,`256`,`clean`                 |

When you set styles, it will override `dark` and `light` mode colors
