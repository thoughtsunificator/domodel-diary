# domodel-diary [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/thoughtsunificator/domodel-diary)

Small diary extension made for [domodel](https://github.com/thoughtsunificator/domodel)

- Calendar
- Daily notes encrypted using AES
- Password Protected

## Getting started

### Installing

```npm instal domodel-diary```

### Usage

```javascript
import "assets/main.css"

import { Core } from "domodel"
import { DiaryModel, DiaryBinding, Diary, Persistence } from "domodel-diary"

window.addEventListener("load", function() {

	const diary = new Diary()

	Persistence({ diary })

	Core.run(DiaryModel, {
		binding: new DiaryBinding({ diary }),
		parentNode: document.body
	})

})

```
