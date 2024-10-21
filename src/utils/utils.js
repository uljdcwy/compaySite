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
 * @param {number} currentPage 
 * @param {number} total  
 * @returns {object}
 */
export const getPagination = (currentPage, total) => {
    // 数据列表总数
    // const dataLen = listData.length;
    // 获取 total 页数
    // const total = (dataLen % currentSize) ? (Math.floor(dataLen / currentSize) + 1) : dataLen / currentSize;
    /**
     * @type any
     */
    const paginationArray = [];

    if(total < 7) {
        paginationArray.push(...Array.from({ length: total }, (v, i) => i + 1));
    }else{
        if(currentPage > 4 && currentPage < (total - 3)){
            paginationArray.push(1);
            paginationArray.push("...");
            paginationArray.push(currentPage-2);
            paginationArray.push(currentPage-1);

            paginationArray.push(currentPage);

            paginationArray.push(currentPage+1);
            paginationArray.push(currentPage+2);
            paginationArray.push("...");
            paginationArray.push(total);
        } else if(currentPage <= 4) {
            paginationArray.push(...Array.from({ length: 6 }, (v, i) => i + 1));
            paginationArray.push("...");
            paginationArray.push(total);
        } else {
            paginationArray.push(1);
            paginationArray.push("...");
            const lastStart = total - 5;
            paginationArray.push(...Array.from({ length: 6 }, (v, i) => lastStart + i));
        };
    }
    return paginationArray;
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