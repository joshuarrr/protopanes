import ReactDOM from 'react-dom'
import React, { Component } from "react"
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex"
import "react-reflex/styles.css"

class CollapsibleElementCls extends React.Component {
  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
    this.state = {
      collapseRight: false,
      collapseLeft: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.onCollapse && this.getSize() < this.props.threshold) {
      this.props.onCollapse()
    }
  }

  getSize() {
    const container = ReactDOM.findDOMNode(this)

    switch (this.props.orientation) {
      case "horizontal":
        return container.offsetHeight
      case "vertical":
        return container.offsetWidth
      default:
        return 0
    }
  }

  render() {
    return (
      <ReflexElement {...this.props} ref={this.wrapper}>
        <div className="pane-content">
          <label>
            I will collapse when I get smaller than &nbsp;{this.props.threshold}
            px
          </label>
        </div>
      </ReflexElement>
    )
  }
}

const CollapsibleElement = React.forwardRef((props, ref) => {
  return <CollapsibleElementCls innerRef={ref} {...props} />
})

class Panes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapseRight: false,
      collapseLeft: false,
      header: false,
    }
  }

  collapseLeft(collapseLeft) {
    this.setState({
      ...this.state,
      collapseLeft,
      header: true,
    })
  }

  collapseRight(collapseRight) {
    this.setState({
      ...this.state,
      collapseRight,
      header: true,
    })
  }

  render() {

  const collapsibleHeader = this.state.header &&
          <ReflexElement className="header" minSize={30} maxSize={30}>
            <div style={{ margin: "6px" }}>
              {this.state.collapseLeft && (
                <button onClick={() => this.collapseLeft(false)}>
                  <label> Show Left Pane </label>
                </button>
              )}
              {this.state.collapseRight && (
                <button onClick={() => this.collapseRight(false)}>
                  <label> Show Right Pane </label>
                </button>
              )}
            </div>
          </ReflexElement>

    return (
      <ReflexContainer orientation="horizontal">
        {collapsibleHeader}
       <ReflexElement>
          <ReflexContainer orientation="vertical">
            {!this.state.collapseLeft && (
              <CollapsibleElement
                className="left-pane"
                onCollapse={() => this.collapseLeft(true)}
                threshold={100}
              />
            )}

            {!this.state.collapseLeft && <ReflexSplitter propagate={true} />}

            <ReflexElement minSize={100} className="middle-pane">
              <div className="pane-content">
                <label>
                  Minimum size: <br /> 100 px
                </label>
              </div>
            </ReflexElement>

            {!this.state.collapseRight && <ReflexSplitter propagate={true} />}

            {!this.state.collapseRight && (
              <CollapsibleElement
                className="right-pane"
                onCollapse={() => this.collapseRight(true)}
                threshold={100}
              />
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

export default Panes