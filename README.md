# domodel-diary

Universal password protected diary application

- Calendar
- Daily notes encrypted using AES
- Password Protected

## Getting started

### Installing

```npm instal domodel-diary```

### Usage

```javascript
import { Core } from "domodel"
import { DiaryModel, DiaryBinding, Diary } from "domodel-diary"

window.addEventListener("load", function() {

  const diary = new Diary()

  Core.run(DiaryModel, {
    binding: new DiaryBinding({ diary }),
    parentNode: document.body
  })

})

```

### Demos

- [domodel-diary-web](https://github.com/thoughtsunificator/domodel-diary-web)
- [domodel-diary-extension](https://github.com/thoughtsunificator/domodel-diary-extension)
- [domodel-diary-electron](https://github.com/thoughtsunificator/domodel-diary-electron)
- [domodel-diary-cordova](https://github.com/thoughtsunificator/domodel-diary-cordova)
