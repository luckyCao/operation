import 'styles/views/Editor/LeftBar.less'
import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import TreeView from 'react-treeview'
import dataSource from '../Config'

@autobind
class LeftBar extends React.Component {
  static propTypes = {
    handler: PropTypes.func
  }
  render() {
    return (
      <div className="leftBar-container">
        {dataSource.map((node, i) => {
          const type = node.type
          const label = <span className="node"> { type }</span>
          return (
            <TreeView key={`${type}'|'${i}`} nodeLabel={label} defaultCollapsed={false}>
              { node.components.map((component, index) => <div className="info" data-name={component.name} onDragStart={this.props.handler} draggable="true" key={index}>{component.name}</div>) }
            </TreeView>
          )
        })}
      </div>
    )
  }
}
export default LeftBar
