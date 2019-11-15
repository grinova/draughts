const fs = require('fs')
const Mustache = require('mustache')

const index = fs.readFileSync('./src/server/templates/index.mst', 'utf8')

function template(state, content, styleTags) {
  return Mustache.render(index, { state: JSON.stringify(state), content, styleTags })
}

module.exports = template
