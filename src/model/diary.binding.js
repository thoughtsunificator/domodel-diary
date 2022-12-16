import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import DiaryEventListener from "./diary.event.js"

import AuthViewModel from "./view/auth.js"
import DiaryViewModel from "./view/diary.js"

import AuthViewBinding from "./view/auth.binding.js"
import DiaryViewBinding from "./view/diary.binding.js"

/**
 * @global
 */
class DiaryBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Diary} properties.diary
	 */
	constructor(properties) {
		super(properties, new DiaryEventListener(properties.diary))
		this.router = new Router([
			new Route("/", AuthViewModel, AuthViewBinding),
			new Route("/diary", DiaryViewModel, DiaryViewBinding)
		], Router.TYPE.VIRTUAL)
	}

	onCreated() {
		this.run(RouterModel, { binding: new RouterBinding({ router: this.router }) })
	}

	/**
	 * @type {Router}
	 */
	get router() {
		return this._router
	}

	set router(router) {
		this._router = router
	}

}

export default DiaryBinding
