import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'

@autobind
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }
  render() {
    return (
      <section className="section pBottom0" style={{ height: '100%' }}>
        <div className="container" style={{ height: '100%' }}>
          <div className="columns layout-container">
            <div className="column layout-1">
              <div className="heading">
                <h1 className="title">test</h1>
              </div>
            </div>
            <div className="column layout-20">{ this.props.children }</div>
          </div>
        </div>
      </section>
    )
  }
}
export default Layout
