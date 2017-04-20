import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { setProp } from 'actions'
import { debounce } from 'throttle-debounce'

@connect(state => ({}), {
  setProp
})
@autobind
class Prop extends React.Component {
  static propTypes = {
    component: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    setProp: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number
    ])
  }
  state = {
    value: this.props.value
  }
  componentDidMount() {
    this.setProp = debounce(500, this.props.setProp)
  }
  handler(e) {
    const { component, title, type } = this.props
    let value = e.target.value
    if (type === 'object') {
      value = value.split(',')
    }
    if (type === 'number') {
      value = parseInt(value)
    }
    this.setState({
      value: e.target.value
    }, this.setProp.bind(null, {
      component: component,
      propName: title,
      propValue: value
    }))
  }
  renderType() {
    const { type } = this.props
    if (type === 'string' || type === 'number') {
      return <input className="input" onChange={this.handler} value={this.state.value} />
    }
    if (type === 'object') {
      return <textarea className="textarea" onChange={this.handler} value={this.state.value} />
    }
  }
  render() {
    const { title } = this.props
    return (
      <div className="prop-container">
        <div>{title}</div>
        {
          this.renderType()
        }
      </div>
    )
  }
}
export default Prop
