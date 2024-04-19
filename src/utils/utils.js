export const generateXHRCancelKey = function () {
    let random = 1000000 * Math.random();
    return Math.floor(random);
}

export const isClient = () => {
    // @ts-ignore
    return (typeof window !== 'undefined');
}

/**
 * @param {any} event 属标事件
 * @param {any} router 需要传送的数据
 * @param {any} query
 * @param {any} params
 * @param {function} cb
 */
export const goRouter = (event, router, query, params, cb) => {
    /**
     * @type {HTMLAnchorElement}
     */
    let aLinkEl = event.target;
    let path = aLinkEl.pathname;
    window.routerPath = path;
    /**
     * @type {string}
     */
    let name = aLinkEl.getAttribute('name') || '';
    /**
     * @type {string}
     */
    let type = aLinkEl.getAttribute('type') || 'push';
    const goStatus = router[type]({
        path,
        name,
        params,
        query
    });
    // 路由进入中;
    goStatus.then((/** @type {any} */ res) => {
        cb(res, path);
    }).catch((/** @type {any} */ err) => {
        console.log("路由进入导航失败")
        router.push({
            path: "/404",
            query: query
        });
        cb(err, path);
    });
    event.preventDefault();
    return false;
}

/**
 * 
 * @returns 
 */
export const importVueFail = () => {
    let err = `errType: load router error \n routerPath: ${window.routerPath}`;
    alert(err);
    throw err;
}