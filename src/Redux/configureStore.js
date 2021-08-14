import { configureStore } from "@reduxjs/toolkit"
import keyReducer from "./keyHandler"
import dataManager from "./dataManager"
import sceneManager from "./sceneManager"

export default configureStore({
  reducer: {
    keyHandler: keyReducer,
    dataManager: dataManager,
    sceneManager: sceneManager,
  },
})
