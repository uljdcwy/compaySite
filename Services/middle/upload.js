import * as fs from "fs";
import { type } from "os";
import * as querystring from "querystring"
export const upload = async (/** @type {{ req: any; body: any; }} */ ctx, /** @type {any} */ next) => {
    let req = ctx.req;
    req.setEncoding('binary');
    let body = '';
    
    let boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
    
    req.on('data', function (/** @type {any} */d) {
        body += d;
    });
    let data = await new Promise((resolve, reject) => {
        req.on("error", () => {
            reject({
                "errno": 1,
                "message": "接收失败"
            })
        })

        req.on('end', () => {

            try {
                fs.accessSync('public', fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                console.log('文件接收完成', err)
                if (err) {
                    fs.mkdirSync("public")
                }
            }
            /**@type {any} */
            let file = querystring.parse(body, '\r\n', ':');
            let fileInfo = file['Content-Disposition']?.split('; ');
            let fileName = '';
            let ext = '';
            for (let value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                    if (fileName.indexOf('\\') != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                    }
                    ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
                }
            }

            let upperBoundary = body.toString().indexOf(file['Content-Type'].substring(1)) + file['Content-Type'].substring(1).length;

            let binaryDataAlmost = body.toString().substring(upperBoundary).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            let uuidFileName = `${Date.now()}.${ext}`
            let uploadDirFile = `./public/${uuidFileName}`

            let writerStream = fs.createWriteStream(uploadDirFile);

            writerStream.write(binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(`--${boundary}--`)), 'binary');
            writerStream.end();

            writerStream.on("error", () => {
                reject({
                    "errno": 1,
                    "message": ""
                })
            })

            writerStream.on('finish', function () {
                console.log("写入完成。");
                resolve({
                    "errno": 0,
                    "data": {
                        "url": uuidFileName,
                        "alt": "",
                        "href": "javascript:void();"
                    }
                })
            });
        })
    });
    ctx.body = data
}