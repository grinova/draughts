import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import Root from './root'
import configureStore from './store/server'

module.exports = function render() {
  const store = configureStore()
  const sheet = new ServerStyleSheet()
  const content = renderToString(
    sheet.collectStyles(
      <StaticRouter>
        <Root store={store}/>
      </StaticRouter>
    )
  )
  const styleTags = sheet.getStyleTags()
  const state = store.getState()
  return { state, content, styleTags }
}
