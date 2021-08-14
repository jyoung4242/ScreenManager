import { createSlice } from "@reduxjs/toolkit"

/**
 *  Creation of redux state slice
 *
 * */

export const sceneMgr = createSlice({
  name: "sceneManager",
  initialState: {
    selectedScene: 0,
    isModalRendered: false,
  },
  reducers: {
    updateSelectedScene: (state, action) => {
      state.selectedScene = action.payload
    },
    setModalRenderFlag: (state, action) => {
      state.isModalRendered = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateSelectedScene, setModalRenderFlag } = sceneMgr.actions

export default sceneMgr.reducer
