import './index.less'
import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'

@autobind
class Background extends React.Component {
  static propTypes = {
    image: PropTypes.string
  }
  render() {
    return (
      <div
        className="background-container"
      >
        <img
          className="background-image"
          alt=""
          src={this.props.image}
        />
      </div>)
  }
}
export default Background
