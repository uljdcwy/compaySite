import * as fs from "fs";
export const getSaveDir = (/** @type {fs.PathLike} */ fileName) => {
    console.info("获取目录了")
    try {
        fs.accessSync(fileName, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        if (err) {
            fs.mkdirSync(fileName)
        }
    };
    return fileName
}