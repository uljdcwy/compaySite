
type koaCtx = any;

// 调用SQL时的接口
interface sqlRun {
     (ctx: koaCtx): Promise<any>;
}

// 不使用SQL写入文件存数据的方法
interface writeFile {
     (ctx: koaCtx): void;
}

interface middle {
     (ctx: koaCtx, next?: Function): Promise<any>
}

interface findSqlRun {
     (params: any, ctx: any): Promise<any>
}

interface sql {
     (sql: string, params: any): Promise<any>
}

type getJsonData = findSqlRun;