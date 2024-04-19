const {
    app,
    BrowserWindow,
	Menu
} = require("electron");
const path = require("path");
const {
	exec
} = require("child_process");
const iconv = require('iconv-lite');
const sudo = require('sudo-prompt');
const pm2 = require("pm2");
const fs = require("fs");

const isDev = (process.argv && process.argv[2] == "development");

// 当前服务地址
let appUrl = path.join(app.getAppPath(), '/');
let unpackedUrl = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), '/');
let nodeUrl = appUrl.replace("app.asar","") + (isDev ? "..\\" : "");

let closeAppStatus = false;
	
let options = {
	name: 'Electron',
	icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
};


// 主进程代码运行时 主进程代码会一直运行在 CPU 的时序中  因

function createWindow() {

    // 创建窗口对象
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        // 开启node在渲染进程中使用
        webPreferences: {
            // 在预加载可以使用node
            nodeIntegration: true,
            // 在预加载中的require 使用node
            nodeIntegrationInWorker: true,
            preload:  appUrl +  (isDev ? "../" : "") + "electron-preload/preload.js"
        },
        show: false
    });
	
	
	window.on('close', async (e) => {
		if(closeAppStatus){
        // 读取渲染进程文件
			window.loadFile(appUrl +  (isDev ? "../" : "") + "electron-renderer/closeServer.html");
			e.preventDefault();
			return ;
		}
		// e.preventDefault();
		// pm2.killDaemon(function(){
		// 		app.exit();
		// });
		if(BrowserWindow.getAllWindows().length <= 1){
			closeAppStatus = true;
			e.preventDefault();
			// 关闭服务pm2
			exec(`${nodeUrl}node\\killPm2.bat ${nodeUrl}node`, { cwd: "" }, function (eror, sdout, sterr) {
				// 看端口中所有进程
				exec(`netstat -aon|findstr 9999`,function(lokPortErr, lokPortSdout, lokPortSterr){
					const encoding = 'cp936';
					const binaryEncoding = 'binary';
					let outStr = iconv.decode(new Buffer(lokPortSdout, binaryEncoding), encoding);
					let execNodeExe = /([0-9]+)(\r|$)/g.exec(outStr);
					let str = "";
					while(execNodeExe){
						// 收集所有9999端口进程
						// @ts-ignore
						if(execNodeExe[1] != 0 && str.search(execNodeExe[1]) < 0){
							str += `/PID ${execNodeExe[1]} `;
						};
						outStr = outStr.substring(execNodeExe.index + execNodeExe[1].length,outStr.length);
						execNodeExe = /([0-9]+)(\r|$)/g.exec(outStr);
					};
					// 查询pid 为0 的所有进程
					exec(`tasklist|findstr 0`,function(lookPortErr, lookPortSdout, lookPortSterr){
						outStr = iconv.decode(new Buffer(lookPortSdout, binaryEncoding), encoding);
						execNodeExe = /node\.exe\s+([0-9]+)?/mg.exec(outStr);
						let execLength = /node\.exe.+(\r|$)/mg.exec(outStr);
						while(execNodeExe){
							// 收集所有node进程
							// @ts-ignore
							if(execNodeExe[1] != 0 && str.search(execNodeExe[1]) < 0){
								str += `/PID ${execNodeExe[1]}; `;
							};
							// @ts-ignore
							outStr = outStr.substring(execNodeExe.index + execLength[0].length,outStr.length);
							execLength = /node\.exe.+(\r|$)/mg.exec(outStr);
							execNodeExe = /node\.exe\s+([0-9]+)?/mg.exec(outStr);
						};
						// 关闭所有收集进程
						exec(`taskkill /T /F ${str}`,function(closePortErr, closePortSdout, closePortSterr){
							app.exit();
						});
					})
				});
			});
		}
	})

    // 页面加载完成
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });
    // 第三个参数为加载URL地址
    if (process.argv[3]) {
        window.loadURL(process.argv[3]);
    } else {
        // 读取渲染进程文件
        window.loadFile(appUrl +  (isDev ? "../" : "") + "electron-renderer/index.html");
    }
    if(isDev) window.webContents.openDevTools();
}

// 应用程序加载完成
app.whenReady().then(() => {
	/**
	 * 
	 */
	let startPm2 = function(){	
		
		function cmdPm2(){
			exec(nodeUrl + 'node\\startPm2.bat ' + nodeUrl + "node", { cwd: nodeUrl + "node" }, (error, stdout, stderr) => {})
		};
		exec(`start ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\bin\\mysql -uroot -p123`,function(conErr,conSto,conStEr){
			if(conErr){
				// 判断sql 连接是否成功
				fs.readFile(nodeUrl + 'node\\DB.JSON',{encoding: "utf-8"},function(err,str){
					if(err){
						cmdPm2();
					}else{
						if(str.search(/(127\.0\.0\.1|localhost)/i) > -1){
							steupMySql();
						}else{
							cmdPm2();
						}
					}
				});
			}else{
				cmdPm2();
			}
		})
	};
	
	
		
	function steupMySql(){
		sudo.exec(`start echo sql服务连接错误正在卸载，请在卸载完成后重新启动应用程序 && net stop mysql && Xcopy ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\data ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\bin /s/y && rd /s /q ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\data && del ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\my.ini && ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\bin\\mysqld remove`,options,function(stopSqlErr,stopSqlStd,stopSqlTErr){
		});
	}
	
	function initMysql(){
		exec(`${unpackedUrl + (isDev ? "..\\" : "")}mysql\\bin\\mysqld.exe --initialize --console`,function(err,sudot,stdoutsql){
			stdoutsql = iconv.decode(new Buffer(stdoutsql, binaryEncoding), encoding);
			let addrReg = "root@localhost:";
			let strStart = stdoutsql.search(addrReg);
			stdoutsql = stdoutsql.slice(strStart + addrReg.length,stdoutsql.length).trim();
			// mysql 密码 初如化密码完成
			sudo.exec(`start ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\install_mysql.bat ` + `"${stdoutsql}"`, options, (eror, sdout, sterr) => {
				if(eror){
					exec(`cd ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\data\\dormitory || rd /s /q ${unpackedUrl + (isDev ? "..\\" : "")}mysql\\data`,function(cdErr,cdSdout,cdSterr){
					});
				}else{
					startPm2();
				}
				// 在启动pm2前 鼗mysql 默认密码写入config.json
			});
		})
	}

	const encoding = 'cp936';
	const binaryEncoding = 'binary';
	// 查看 Mysql 是否启动 如果没启动则调用权限启动Mysql
	exec('net start', (error, stdout, stderr) => {
		let outStr = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
		if (outStr.search(/MySQL/i) < 0) {
			initMysql();
		}else{
			startPm2();
		}
	});
	
		
    createWindow();
	Menu.setApplicationMenu(null);
    app.on("activate", () => {
        // 如果应用程序处理活动状态并且窗口全部关闭则创建一个默认空口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 所有窗口关闭时
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});