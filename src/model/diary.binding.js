import CryptoES from "crypto-es";
import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import AuthModel from "./view/auth.js"
import DiaryModel from "./view/diary.js"

import AuthBinding from "./view/auth.binding.js"
import DiaryBinding from "./view/diary.binding.js"

export default class extends Binding {

	onCreated() {

		const { diary } = this.properties

		const router = new Router([
			new Route("/", AuthModel, AuthBinding),
			new Route("/diary", DiaryModel, DiaryBinding)
		], Router.TYPE.VIRTUAL)

		this.listen(diary, "reset", () => {
			diary.firstRun = true
			diary.emit("logout")
		})

		this.listen(diary, "logout", () => {
			diary.password = null
			diary.clearNotes()
			router.emit("browse", { path: "/" })
		})
		this.run(RouterModel, { binding: new RouterBinding({ router }) })

	}

}
