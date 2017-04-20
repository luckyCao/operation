import React, { createElement, PropTypes } from 'react'
import { autobind } from 'core-decorators'
import LeftBar from 'views/Editor/LeftBar'
import Simulator from 'views/Editor/Simulator'
import Page from 'views/Editor/Page'
import Generator from 'views/Editor/Generator'
import { connect } from 'react-redux'
import { addElement } from 'actions'
import * as api from 'api'
import incinerator from 'hooks/incinerator'

import dataSource from '../Config'

import Background from 'bundle?lazy!components/Background/index.js'
import List from 'bundle?lazy!components/List/index.js'
import Lottery from 'bundle?lazy!components/Lottery/index.js'

const loadContainerAsync = bundle => (cb) => {
  bundle(component => {
    cb(null, component)
  })
}
const components = {
  Background: loadContainerAsync(Background),
  List: loadContainerAsync(List),
  Lottery: loadContainerAsync(Lottery)
}
@connect(state => ({
  elements: state.components.elements
}), {
  addElement
})
@autobind
class Editor extends React.Component {
  static propTypes = {
    elements: PropTypes.array,
    addElement: PropTypes.func
  }
  componentDidMount() {
    api.getPage({
      id: this.getUrlParam('id') || 1
    })
      .then(res => {
        incinerator('normal', res.responseCode, {
          success: () => {
            if (!res.responseData.config) {
              return
            }
            const config = JSON.parse(res.responseData.config)
            const pList = config.map(item => {
              return new Promise((resolve, reject) => {
                components[item.name]((err, component) => {
                  resolve({
                    type: component.default,
                    name: item.name,
                    props: item.props
                  })
                })
              })
            })
            Promise.all(pList).then(values => {
              console.log(values)
              this.props.addElement(values)
            })
          },
          fail: () => {}
        })
      })
  }
  getUrlParam(name) {
    const search = window.location.search.substr(1)
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = search.match(reg)
    if (r != null) return decodeURIComponent(r[2]); return null
  }
  setComponent(name, props = {}) {
    components[name]((err, component) => {
      this.props.addElement({
        type: component.default,
        name: name,
        props: props
      })
    })
  }
  dragStart(e) {
    const ev = e.nativeEvent
    const target = ev.srcElement
    ev.dataTransfer.setData('text/plain', target.dataset.name)
  }
  drop(e) {
    console.log('drop')
    const ev = e.nativeEvent
    const name = ev.dataTransfer.getData('text')
    const props = dataSource[0].components.filter((elem) => elem.name === name)[0].props
    this.setComponent(name, props)
  }
  render() {
    const elements = this.props.elements.map((elem, index) => createElement(elem.type, Object.assign({ key: index}, elem.props)))
    return (<div className="flex-row">
      <div className="layout-1">
        <LeftBar handler={this.dragStart} />
      </div>
      <div className="layout-2" style={{ position: 'relative' }}>
        <Simulator handler={this.drop} components={elements} />
        <Generator />
      </div>
      <div className="layout-1">
        <Page components={this.props.elements} />
      </div>
    </div>)
  }
}
export default Editor
