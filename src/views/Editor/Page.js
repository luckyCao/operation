import 'styles/views/Editor/Page.less'
import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import Prop from 'views/Editor/Prop'
import TreeView from 'react-treeview'

@autobind
class Page extends React.Component {
  static propTypes = {
    components: PropTypes.array
  }
  render() {
    const { components } = this.props
    const label = <span className="node"> page</span>
    return (
      <div className="page-container">
        {
          <TreeView nodeLabel={label} defaultCollapsed={false}>
            {components.map((component, i) => {
              const label1 = <span className="node">{component.name}</span>
              return (
                <TreeView nodeLabel={label1} key={component.name + i} defaultCollapsed={false}>
                  {Object.keys(component.props).map((prop, index) => {
                    return <Prop key={index} component={component.name} title={prop} type={typeof component.props[prop]} value={component.props[prop]}/>
                  })}
                </TreeView>
              )
            })}
          </TreeView>
        }
      </div>
    )
  }
}
export default Page
