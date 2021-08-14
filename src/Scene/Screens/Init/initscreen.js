import React, { useEffect } from "react"
import "./init.css"
import { updateSelectedScene } from "../../../Redux/sceneManager"
import { useDispatch } from "react-redux"

function InitScreen() {
  const dispatch = useDispatch()

  function initiate() {
    dispatch(updateSelectedScene(1))
  }

  return (
    <div className="initScreen " onClick={initiate}>
      <span className="blank blink_me">Click to Launch Game</span>
    </div>
  )
}

export default InitScreen
