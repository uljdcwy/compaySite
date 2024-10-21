class ClearPrint {
    /**
     * @param {any} doneCallback
     * @param {any} failCallback
     */
    constructor(doneCallback, failCallback){
        this.doneCallback = doneCallback;
    }
    /**
     * @param {{ hooks: { emit: { tapAsync: (arg0: string, arg1: (compilation: any, callback: any) => void) => void; }; }; }} compiler
     */
    apply(compiler){
        compiler.hooks.emit.tapAsync('ClearPrint',(/** @type {{ assets: { [x: string]: { _value: any; }; }; }} */ compilation,/** @type {() => void} */ callback)=>{
            for(let key in compilation.assets){
                let str = compilation.assets[key]._value;
                compilation.assets[key]._value = str.replace(/console.log\([^)]+[\)];?/,'');
            }
            callback();
            // @ts-ignore
            this.doneCallback && this.doneCallback()
        })
    }
}

module.exports = ClearPrint;