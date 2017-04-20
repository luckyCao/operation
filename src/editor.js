import 'styles/views/Editor/Editor.less'
import React from 'react'
import { render } from 'react-dom'
import Editor from 'views/Editor/Editor'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <Editor />
  </Provider>,
  document.getElementById('root')
)
