import React from 'react'
import { autobind } from 'core-decorators'
import * as api from 'api'
import incinerator from 'hooks/incinerator'

@autobind
class List extends React.Component {
  state = {
    list: []
  }
  componentDidMount() {
    api.getList()
      .then(res => {
        incinerator('normal', res.responseCode, {
          success: () => {
            this.setState({
              list: res.responseData.list
            })
          },
          fail: () => {}
        })
      })
  }
  handler(e) {
    const ev = e.nativeEvent
    const target = ev.srcElement
    api.savePage({
      id: target.dataset.id,
      config: ''
    })
      .then(res => {
        incinerator('normal', res.responseCode, {
          success: () => {
            alert('清除成功')
          },
          fail: () => {}
        })
      })
  }
  render() {
    return (
      <div className="columns layout-container">
        <div className="column layout-11">
          <table className="table is-narrow">
            <thead>
              <tr className="flex-row">
                <th className="layout-1">名称</th>
                <th className="layout-2">描述</th>
                <th className="layout-1">操作</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.list.map(item => <tr className="flex-row" key={item.id}>
                <td className="layout-1"><div className="list-item">{ item.name }</div></td>
                <td className="layout-2"><div className="list-item">{ item.description }</div></td>
                <td className="layout-1">
                  <a href={`editor.html?id=${item.id}`} className="button">编辑</a>
                  <button className="button list-clear" data-id={item.id} onClick={this.handler}>清除组件</button>
                </td>
              </tr>)
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default List
