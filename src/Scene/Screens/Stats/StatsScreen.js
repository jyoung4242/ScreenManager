import React from "react"
import "./stats.css"

import { useSelector } from "react-redux"

function StatsScreen() {
  const { odometers } = useSelector((state) => state.dataManager)

  /**
   * msToTime, converts ms durations into
   *  hours, minutes, seconds string for display
   */
  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return hours + ":" + minutes + ":" + seconds
  }

  //JSX for form
  return (
    <div className="ScreenStatsDiv">
      <span className="stats_span">
        <span>STATS!!!</span>
        <br></br>
        <span> {odometers.map((odo, index) => msToTime(odo.duration))}</span>
      </span>
    </div>
  )
}
export default StatsScreen
