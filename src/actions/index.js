import * as types from '../constants/actionTypes'
/*
   添加组件
 */
export function addElement(element) {
  return {
    type: types.ADD_ELEMENT,
    data: element
  }
}
/*
   设置组件属性
 */
export function setProp(prop) {
  return {
    type: types.SET_PROP,
    data: prop
  }
}
