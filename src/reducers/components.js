/**
 * 页面组件信息
 */
import {
  ADD_ELEMENT,
  SET_PROP
} from 'constants/actionTypes'

const defaultState = {
  elements: [],
}

export default function components(state = defaultState, action) {
  switch (action.type) {
    case ADD_ELEMENT:
      return Object.assign({}, state, {
        elements: state.elements.concat(action.data)
      })
    case SET_PROP:
      const index = state.elements.reduce((cur, item, index) => {
        if (item.name === action.data.component) {
          return index
        }
        return cur
      }, 0)
      let newProp = Object.assign({}, state.elements[index].props)
      newProp[action.data.propName] = action.data.propValue
      return Object.assign({}, state, {
        elements: state.elements.slice(0, index).concat({
          name: state.elements[index].name,
          props: newProp,
          type: state.elements[index].type
        }).concat(state.elements.slice(index + 1))
      })
    default:
      return state
  }
}
