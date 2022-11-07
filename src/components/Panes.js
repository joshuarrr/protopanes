
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import 'react-reflex/styles.css'


const Panes = () => {
  return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <div className="pane-content">Left Pane</div>
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement className="right-pane">
          <div className="pane-content">Right Pane</div>
        </ReflexElement>
      </ReflexContainer>
  )
}

export default Panes

