const fs = require("fs");
let basePath = process.cwd();
const project = require("./../project.json")
class DevHtml {
  /**
   * @param {{ hooks: { done: { tap: (arg0: string, arg1: (compilation: any, callback: any) => void) => void; }; }; }} compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap('DevHtml ', (/** @type {{ compilation: { assets: any; }; }} */ compilation, /** @type {any} */ callback) => {

      Object.keys(compilation.compilation.assets).map((el, idx) => {
        console.log(el,"el")
        if (el.indexOf("/js/") > -1 && el.indexOf(".map") < 0) {
          let str = `<!doctype html>
          <html lang="en" manifest="app.appcache">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="Window-target" content="_top">
                <meta http-equiv="content-Type" content="text/html; charset=utf-8">
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
                <meta http-equiv="Pragma" content="no-cache" />
                <meta http-equiv="Expires" content="0" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
                <title> - </title>
                <script>try { global } catch (e) { window.global = window; }</script>
                <script defer="defer" src="${el}"></script>
                <script defer="defer" src="${el}.map"></script>
              </head>
    
            <body><div id="app"></div></body>
            
            </html>`

          try {
            fs.accessSync(basePath + '/web', fs.constants.R_OK | fs.constants.W_OK);
          } catch (err) {
            if (err) {
              fs.mkdirSync(basePath + "/web")
            }
          }

          fs.writeFile(basePath + `/web/${/\/js\/([a-z]+)/.exec(el)[1]}.html`, str, function (/** @type {any} */ err, /** @type {any} */ data) {
            if (err) {
              return console.error(err);
            }
          });
        }
      })
    })
  }
}

module.exports = DevHtml