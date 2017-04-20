import './index.less'
import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'

@autobind
class Lottery extends React.Component {
  static propTypes = {
    left: PropTypes.number,
    top: PropTypes.number,
    content: PropTypes.string
  }
  state = {
    flag: false
  }
  handler() {
    this.setState({
      flag: !this.state.flag
    })
  }
  render() {
    const { left, top, content } = this.props
    return (<div className="lottery-container" style={{ left: left, top: top }}>
      <div className="button lottery-button" onClick={this.handler}>
        { content || '抽奖' }
      </div>
      {
        this.state.flag && <div className="lottery-mask"></div>
      }
      {
        this.state.flag &&
          <div className="lottery-content">
            <div className="lottery-info">
              100元投资卷<span className="lottery-close" onClick={this.handler}>关闭</span>
            </div>
          </div>
      }
    </div>)
  }
}
export default Lottery
