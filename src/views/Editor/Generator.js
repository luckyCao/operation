import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import * as api from 'api'
import incinerator from 'hooks/incinerator'

let qrcode
@connect(state => ({
  elements: state.components.elements
}), {})
@autobind
class Generator extends React.Component {
  static propTypes = {
    handler: PropTypes.func,
    elements: PropTypes.array,
    setComponent: PropTypes.func,
  }
  state = {
    pending: false,  // 生成二维码的时候不能点击下载
  }
  getUrlParam(name) {
    const search = window.location.search.substr(1)
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = search.match(reg)
    if (r != null) return decodeURIComponent(r[2]); return null
  }
  save() {
    const pConfig = this.props.elements.map(elem => {
      return {
        name: elem.name,
        props: elem.props
      }
    })
    api.savePage({
      id: this.getUrlParam('id'),
      config: JSON.stringify(pConfig)
    })
      .then(res => {
        incinerator('normal', res.responseCode, {
          success: () => {
            alert('保存成功')
          },
          fail: () => {}
        })
      })
  }
  handler() {
    const { elements } = this.props
    if (elements.length === 0) {
      return
    }
    if (qrcode) {
      this.removeQRCode()
    }
    this.setState({
      pending: true
    })
    api.getUrl({
        elements: elements.map(elem => {
          return {
            name: elem.name,
            props: elem.props
          }
        })
      })
      .then(res => {
        incinerator('normal', res.responseCode, {
          success: () => {
            this.setState({
              pending: false
            })
            const href = `${location.origin}${res.responseData.url}`
            if (!qrcode) {
              qrcode = new QRCode(document.getElementById('qrcode'), {
                text: href,
                width: 128,
                height: 128,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              })
            } else {
              qrcode.clear()
              qrcode.makeCode(href)
            }
          },
          fail: () => {
            this.setState({
              pending: false
            })
          }
        })
      })
  }
  download() {
    if (this.state.pending) {
      return
    }
    location.href = '/page/download'
  }
  removeQRCode() {
    const elem = document.getElementById('qrcode')
    elem.innerHTML = ''
  }
  render() {
    return (
      <div className="generator-container flex-row">
        <div className="layout－1 generator-item">
          <button className={`button ${this.state.pending ? 'is-loading' : ''}`} onClick={this.handler}>生成二维码</button>
          <div id="qrcode"></div>
        </div>
        <div className="layout－1 generator-item">
          <button className="button" onClick={this.download}>下载</button>
        </div>
        <div className="layout－1 generator-item">
          <button className="button" onClick={this.save}>保存</button>
        </div>
      </div>
    )
  }
}
export default Generator
