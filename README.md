# React emoji search

<div align="center">
Emoji picker displayed just like Whatsapp.

[Demo](https://moji-search.herokuapp.com/)
<br/><br/>
<a href="https://app.travis-ci.com/zeddz92/react-emoji-search"><img src="https://app.travis-ci.com/zeddz92/react-emoji-search.svg?branch=main" alt="Build Status"></a>
<a href="https://snyk.io/test/github/zeddz92/react-emoji-search?targetFile=package.json"><img src="https://snyk.io/test/github/zeddz92/react-emoji-search/badge.svg?targetFile=package.json" alt="Vulnerability Status"></a>
<a href="https://codecov.io/github/zeddz92/react-emoji-search?branch=main"><img src="https://img.shields.io/codecov/c/github/zeddz92/react-emoji-search.svg" alt="Coverage Status"></a>
<a href="https://codeclimate.com/github/zeddz92/react-emoji-search/maintainability"><img src="https://api.codeclimate.com/v1/badges/8b3068fb4b0c7a43199b/maintainability" /></a>

</div>

<div style="display: flex; align-items:center; height: 320px; justify-content: between; margin: 15px 0;">
<img src="https://user-images.githubusercontent.com/8311115/147536323-e3324649-6266-41b0-be56-5b0128b42d8b.gif" style=""/>
</div>

### Features:

- Fully customizable
- Faster load for high quality emojis
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

<EmojiPicker set="apple" emojiSize={24} emojiSpacing={8}/>
<EmojiPicker emojiVersion={12.0}/>
<EmojiPicker onEmojiClick={(emoji) => setEmoji(emoji)} />
<EmojiPicker
  styles={{
    backgroundColor: "#2e4960",
    indicatorColor: "#b04c2d",
    fontColor: "lightgrey",
    searchBackgroundColor: "#263d51",
    tabsFontColor: "#8cdce4",
    searchFontColor: "lightgrey",
    skinTonePickerBackgroundColor: "#284155",
  }}
/>
```

### Properties

| Name         | Type     | Default     | Description                                                                       |
| :----------- | :------- | :---------- | :-------------------------------------------------------------------------------- |
| set          | string   | apple       | Emoji icon set: `apple`,`facebook`,`twitter`,`google`, `native`                   |
| emojiSize    | number   | 32          | Emojis size for the picker                                                        |
| sheetSize    | string   | 64          | The emoji sheet sizes are: `32`,`64`                                              |
| emojiSpacing | number   | 12          | Gap between emojis                                                                |
| emojiVersion | number   | 12.1        | version of the emoji list                                                         |
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

- [apple](https://cdn.jsdelivr.net/npm/emoji-datasource-apple-split/img/)
- [facebook](https://cdn.jsdelivr.net/npm/emoji-datasource-facebook-split/img/)
- [twitter](https://cdn.jsdelivr.net/npm/emoji-datasource-twitter-split/img/)
- [google](https://cdn.jsdelivr.net/npm/emoji-datasource-google-split/img/)

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
