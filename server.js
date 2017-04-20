import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import ip from 'ip';
import colors from 'colors';
import chokidar from 'chokidar'
import bodyParser from 'body-parser'

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3021 : process.env.PORT;
const app = express();
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config[0].output.publicPath,
    contentBase: 'dist/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(express.static(path.join(__dirname, 'src/public')));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/page',(req, res, next) => {
    require('./src/controller/index.js').default(req, res, next)
  });
  app.get("/index.html", function(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
  });
  app.get("/editor.html", function(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/editor.html')));
  });
  app.get('*', function response(req, res) {
    //if no favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'images/x-icon'});
      res.end();
      return;
    }
    if(req.url.indexOf('pdf')>0){
      return;
    }
    res.end();
  });
  const watcher = chokidar.watch('./src/controller/index.js')
  watcher.on('ready', function () {
    watcher.on('all', function () {
      console.log("Clearing /mock/ module cache from server")
      Object.keys(require.cache).forEach(function (id) {
        delete require.cache[id]
      })
    })
  })
} else {
  app.use(express.static(__dirname + '/build'));
  app.get('*', function response(req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'images/x-icon'});
      res.end();
      return;
    }
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

app.listen(port, ip.address(), function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on  ' + (ip.address() + ':3021').blue);
});
