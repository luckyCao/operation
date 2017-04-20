import "styles/normalize.less"
import 'components/Background/index.less'
import 'components/Lottery/index.less'
import React, { createElement } from "react"
import { render } from "react-dom"
import { autobind } from "core-decorators"
import dataSource from "./config"
import Background from 'bundle?lazy!components/Background/index.js'
import Lottery from 'bundle?lazy!components/Lottery/index.js'
const loadContainerAsync = bundle => (cb) => {
	bundle(component => {
	cb(null, component)
})
}
const components = {
Background: loadContainerAsync(Background),
Lottery: loadContainerAsync(Lottery),
}
@autobind
class Container extends React.Component {
state = {
elements: []
}
componentWillMount() {
const pList = dataSource.map(item => {
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
this.setState({elements: values})})}
render() {
const elements = this.state.elements.map((elem, index) => createElement(elem.type, Object.assign({ key: index}, elem.props)))
return (<div style={{ width: "100%", height: "100%" }}>
{ elements }
</div>)}}
render(<Container />, document.getElementById("root"))