const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const fetch = require('node-fetch')
const Handlebars = require('handlebars')
const source = fs.readFileSync(path.resolve(__dirname, 'template.hbs'), 'utf8')
const template = Handlebars.compile(source)
mkdirp('./dist/').then(made => {
  fetch('https://registry.npmjs.org/darcy/')
  .then(res => res.json())
  .then((pkg) => {
    return {
      name: pkg.name,
      version: pkg['dist-tags'].latest
    }
  })
  .then(pkg => fs.writeFileSync('./dist/index.html', template({ pkg })))
})
