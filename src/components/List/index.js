import './index.less'
import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'

@autobind
class List extends React.Component {
  static propTypes = {
    content: PropTypes.array,
    left: PropTypes.number,
    top: PropTypes.number
  }
  render() {
    const { left, top, content } = this.props
    return (<div className="list-container" style={{ left: left, top: top }}>
      { content.map((item, index) => <div className="list-item" key={index}>{item}</div>) }
    </div>)
  }
}
export default List
