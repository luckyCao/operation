import express from 'express';
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const rimraf = require('rimraf');
import connection from '../db/index';
import webpack from 'webpack';
import config from '../../webpack.bundle.js';
var HtmlWebpackPlugin = require('html-webpack-plugin');

const app = express.Router();

app.get('/generate', function(req,res,next){
  const configFile = path.resolve(__dirname, '../public/config.js')
  fs.writeFile(configFile,
    `const dataSource = ${JSON.stringify(req.query.elements)}\nexport default dataSource`,
    'utf8',
    writeIndex
  )
  function writeIndex(err) {
    const indexPath = path.resolve(__dirname, '../public/index.js')
    const code = [
      'import "styles/normalize.less"',
      ]
      .concat(req.query.elements.map(elem => `import 'components/${elem.name}/index.less'`))
      .concat([
        'import React, { createElement } from "react"',
        'import { render } from "react-dom"',
        'import { autobind } from "core-decorators"',
        'import dataSource from "./config"'
      ])
      .concat(req.query.elements.map(elem => `import ${elem.name} from 'bundle?lazy!components/${elem.name}/index.js'`))
      .concat([
        'const loadContainerAsync = bundle => (cb) => {',
        indent('bundle(component => {'),
        indent('cb(null, component)'),
        '})',
        '}',
        'const components = {'
      ])
      .concat(req.query.elements.map(elem => `${elem.name}: loadContainerAsync(${elem.name}),`))
      .concat([
        '}',
        '@autobind',
        'class Container extends React.Component {',
        'state = {',
        'elements: []',
        '}',
        'componentWillMount() {',
        'const pList = dataSource.map(item => {',
        'return new Promise((resolve, reject) => {',
        'components[item.name]((err, component) => {',
        'resolve({',
        'type: component.default,',
        'name: item.name,',
        'props: item.props',
        '})',
        '})',
        '})',
        '})',
        'Promise.all(pList).then(values => {',
        'this.setState({elements: values})})}',
        'render() {',
        'const elements = this.state.elements.map((elem, index) => createElement(elem.type, Object.assign({ key: index}, elem.props)))',
        'return (<div style={{ width: "100%", height: "100%" }}>',
        '{ elements }',
        '</div>)}}',
        'render(<Container />, document.getElementById("root"))'
      ])
      .join('\n')

    fs.writeFile(indexPath,
      code,
      'utf8',
      done
    )
  }
  function done(err) {
    rimraf(path.resolve(__dirname, '../public/dist'), () => {
      config.plugins.push(new HtmlWebpackPlugin({
        template: 'src/public/index.tpl.html',
        inject: 'body',
        filename: 'index.html'
      }))
      const compiler = webpack(config);
      compiler.run(() => {
        let resData = {
          responseMessage: 'test',
          responseCode: '000000',
          responseData: {
            url: '/dist/index.html'
          }
        }
        if (err) {
          resData.responseCode = '000001'
        }
        res.json(resData)
      })
    });
  }
  function indent(str) {
    if(Array.isArray(str)) {
      return str.map(indent).join("\n");
    } else {
      str = str.trimRight();
      if(!str) return "";
      var ind = (str[0] === "\n" ? "" : "\t");
      return ind + str.replace(/\n([^\n])/g, "\n\t$1");
    }
  }
})

app.get('/download', function(req, res, next) {
  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', 'attachment; filename=dist.zip');
  const archive = archiver('zip')
  res.on('close', function() {
    next()
  });
  archive.on('error', function(err) {
    next()
  });
  archive.pipe(res)
  archive.directory(path.resolve(__dirname, '../public/dist/'), '').finalize()
})

app.get('/list', function(req, res, next){
  connection.query("SELECT * FROM pages", null, function (err, data) {
    let resData = {
      responseMessage: 'test',
      responseCode: '000000',
      responseData: {
        list: data
      }
    }
    if (err) {
      resData.responseCode = '000001'
    }
    res.json(resData)
  })
})

app.post('/save', function(req, res, next) {
  connection.query('UPDATE pages SET config = ? WHERE id = ?', [req.body.config || '', req.body.id], function (err, data) {
    let resData = {
      responseMessage: 'test',
      responseCode: '000000'
    }
    if (err) {
      resData.responseCode = '000001'
    }
    res.json(resData)
  })
})

app.get('/info', function(req, res, next) {
  connection.query('SELECT * FROM pages WHERE id = ?', [req.query.id], function (err, data) {
    let resData = {
      responseMessage: 'test',
      responseCode: '000000',
      responseData: {
        config: data[0].config
      }
    }
    if (err) {
      resData.responseCode = '000001'
    }
    res.json(resData)
  })
})

export default app
