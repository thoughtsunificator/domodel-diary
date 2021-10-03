import CryptoES from "crypto-es";
import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import DiaryEventListener from "./view/diary.event.js"

import AuthModel from "./view/auth.js"
import DiaryModel from "./view/diary.js"

import AuthBinding from "./view/auth.binding.js"
import DiaryBinding from "./view/diary.binding.js"

/**
 * @global
 */
class DiaryBinding extends Binding {

	constructor(properties) {
		super(properties, new DiaryEventListener(properties.diary))
	}

	onCreated() {

		const { diary } = this.properties

		const router = new Router([
			new Route("/", AuthModel, AuthBinding),
			new Route("/diary", DiaryModel, DiaryBinding)
		], Router.TYPE.VIRTUAL)

		this.run(RouterModel, { binding: new RouterBinding({ router }) })

	}

}

export default DiaryBinding
