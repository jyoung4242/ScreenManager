import React, { useEffect, useState } from "react"
import "./app.css"
/**
 *  imports for redux toolkit
 *  keyHandler is store for keyboard state
 *  KeyboardEvents is the actual component setup of event handlers
 *  DataManagement is the actual component setup of data event handlers
 *  ScreenManager is the component setup for screens and transitions
 */
import { useSelector, useDispatch } from "react-redux"
import { regKey, unregKey } from "./Redux/keyHandler"
import KeyBoardEvents from "./Controls/KeyboardEvents"
import { createOdo, startOdo } from "./Redux/dataManager"
import DataManagement from "./Analytics/DataMgmt"
import ScreenManager from "./Scene/ScreenManager"
import { updateSelectedScene, setModalRenderFlag } from "./Redux/sceneManager"

function App() {
  /**
   *  GlobalKeys is the redux state array for globally scoped keys that are registered
   *  dispatch gives us access to the regKey and unregKey action creators
   * */
  const { GlobalKeys } = useSelector((state) => state.keyHandler)
  const { isModalRendered } = useSelector((state) => state.sceneManager)
  const dispatch = useDispatch()

  const [firstRender, setFirstRender] = useState(true)
  /**
   *  Initial lifecycle mounting useEffect
   *  Job is to register specific global keys that will be monitored for lifecycle of entire app
   * */

  useEffect(() => {
    dispatch(regKey({ Key: "1", pressed: false, scope: "global" }))
    dispatch(regKey({ Key: "2", pressed: false, scope: "global" }))
    dispatch(regKey({ Key: "3", pressed: false, scope: "global" }))
    dispatch(regKey({ Key: "4", pressed: false, scope: "global" }))
    dispatch(regKey({ Key: "m", pressed: false, scope: "global" }))

    /**
     * Duration played odometer object, tracks how long you've "played" and creates the 8 second limit event seperately
     */
    dispatch(createOdo({ key: "duration played", duration: 0, activeStatus: false, LimitFlags: [] }))

    //startOdo dispatch changes the activeStatus flag to true
    dispatch(startOdo({ key: "duration played" }))

    return () => {
      //unregistering them for cleanup
      dispatch(unregKey("global"))
    }
  }, [])

  //KeyEvent Exception Statement
  function allowKeystroke() {
    return true
  }

  //Keyboard Event Logic - Globally scoped keys
  //useEffect that has GlobalKeys dependancy, for monitoring changes in keyboard state
  useEffect(() => {
    if (allowKeystroke()) {
      {
        //1 button
        let index = GlobalKeys.findIndex((key) => key.Key === "1")
        if (index >= 0) {
          if (GlobalKeys[index].pressed) {
            //Add Logic here for 1 button
            //console.log("Global 1 pressed")
            dispatch(updateSelectedScene(0))
          }
        }
      }
      {
        //m button
        let index = GlobalKeys.findIndex((key) => key.Key === "m")
        if (index >= 0) {
          if (GlobalKeys[index].pressed) {
            //Add Logic here for 1 button
            if (isModalRendered) {
              dispatch(setModalRenderFlag(false))
            } else {
              dispatch(setModalRenderFlag(true))
            }
          }
        }
      }
      {
        //2 button
        let index = GlobalKeys.findIndex((key) => key.Key === "2")
        if (index >= 0) {
          if (GlobalKeys[index].pressed) {
            //Add Logic here for 2 button
            //console.log("Global 2 pressed")
            dispatch(updateSelectedScene(1))
          }
        }
      }
      {
        //3 button
        let index = GlobalKeys.findIndex((key) => key.Key === "3")
        if (index >= 0) {
          if (GlobalKeys[index].pressed) {
            //Add Logic here for 3 button
            //console.log("Global 3 pressed")
            dispatch(updateSelectedScene(2))
          }
        }
      }
      {
        //4 button
        let index = GlobalKeys.findIndex((key) => key.Key === "4")
        if (index >= 0) {
          if (GlobalKeys[index].pressed) {
            //Add Logic here for 4 button
            //console.log("Global 4 pressed")
            dispatch(updateSelectedScene(3))
          }
        }
      }
    }
  }, [GlobalKeys])

  //Container JSX
  //This uses react router to switch between screens
  //<KeyBoardEvents /> component is added, with no UI impact to allow for access
  return (
    <div className="App">
      <KeyBoardEvents />
      <DataManagement interval="1000" />
      <ScreenManager />
    </div>
  )
}

export default App
