// forEach接口;
interface forEach {
    (el: any, index: number): void|boolean;
}

interface filter {
    (el: any): any
}

interface Window  {
    routerPath: string;
    _INIT_I18N_: any,
    _INIT_LANG_: string,
    i18n: any,
    message: any, 
    notification: any, 
    dialog: any, 
    loadingBar: any
}
