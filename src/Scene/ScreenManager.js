import React, { useEffect, useState, useRef } from "react"
import "./sm.css"
//import "./transition.css"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
/**
 *  imports for screen management
 *  simulating multiple screens in a game, think title screen, invetory screen, top-down map screen etc...
 * */
import InitScreen from "./Screens/Init/initscreen"
import Screen1 from "./Screens/Screen1/screen1"
import Screen2 from "./Screens/Screen2/screen2"
import StatsScreen from "./Screens/Stats/StatsScreen"
import Modal1 from "./Modals/Modal1/modal1"

function ScreenManager() {
  /**
   * selectedScene is redux index for which screen to display
   */
  const { selectedScene, isModalRendered } = useSelector((state) => state.sceneManager)
  const nodeRef1 = useRef(null)
  const nodeRef2 = useRef(null)

  /**
   * Local State configuration for managing CSS transitions
   */

  const [screenIndex, setScreenIndex] = useState(1)
  const [triggerInTransition, setTriggerInTransition] = useState(false)
  const [triggerOutTransition, setTriggerOutTransition] = useState(false)
  const [isFadeInRendered, setisFadeInRendered] = useState(true)
  const [isFadeOutRendered, setisFadeOutRendered] = useState(false)

  /**
   * Generator setup and configuration for managing the sequence
   */
  function* transitionGenerator() {
    setisFadeOutRendered(true)
    setTriggerOutTransition(true)
    yield "fadeOutComplete"

    setScreenIndex(selectedScene)
    setisFadeOutRendered(false)
    setTriggerOutTransition(false)
    setisFadeInRendered(true)
    setTriggerInTransition(true)
    yield "pageSwitch"

    setisFadeInRendered(false)
    setTriggerInTransition(false)
    yield "fadeInComplete"
  }
  var tranGen = transitionGenerator()

  //monitors for changing scene, triggers transition sequence
  useEffect(() => {
    transitionSequence()
  }, [selectedScene])

  /**
   * interval sequence that steps generator through
   */
  function transitionSequence() {
    let interval = setInterval(() => {
      while (tranGen.done !== true) {
        tranGen.next()
        return
      }
      clearInterval(interval)
    }, 500)
  }

  /**
   * switch statement that renders different "scene" based on redux value
   */
  function renderSwitch(param) {
    switch (param) {
      case 0:
        return <InitScreen />
      case 1:
        return <Screen1 />
      case 2:
        return <Screen2 />
      case 3:
        return <StatsScreen />
      default:
        return <InitScreen />
    }
  }

  //JSX
  return (
    <div className="screenManager">
      <CSSTransition in={triggerInTransition} timeout={500} classNames="item">
        {isFadeInRendered ? <div id="transitionINDiv"></div> : <div></div>}
      </CSSTransition>
      <CSSTransition in={triggerOutTransition} timeout={500} classNames="out">
        {isFadeOutRendered ? <div id="transitionOUTDiv"></div> : <div></div>}
      </CSSTransition>

      <CSSTransition in={isModalRendered} timeout={700} classNames="modal">
        {isModalRendered ? <Modal1 /> : <div></div>}
      </CSSTransition>

      {renderSwitch(screenIndex)}
    </div>
  )
}

export default ScreenManager
