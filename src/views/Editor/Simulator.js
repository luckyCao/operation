import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import Frame from 'react-frame-component'
const isProduction = process.env.NODE_ENV === 'production'

@autobind
class Simulator extends React.Component {
  static propTypes = {
    components: PropTypes.node,
    handler: PropTypes.func
  }
  dragOver(e) {
    e.nativeEvent.preventDefault()
    e.nativeEvent.dataTransfer.dropEffect = 'move'
  }
  render() {
    return (
      <Frame>
        <link rel="stylesheet" href={`${isProduction ? '/web/editor.css' : '/build/app.css'}`} />
        <div className="simulator-container" onDrop={this.props.handler} onDragOver={this.dragOver}>
          {
            this.props.components
          }
        </div>
      </Frame>
    )
  }
}
export default Simulator
