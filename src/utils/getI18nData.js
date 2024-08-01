import { GET } from "@/http/index.js"


/**
 * 
 * @param {*} routeName 
 * @returns { Promise<any> }
 */
export const getData = (routeName) => {
    let url = getUrl(routeName);
    console.log(url, "url")
    return GET(url, '');
}

/**
 * 
 * @param {string} routeName 
 * @returns 
 */
export const getUrl = (routeName) => {
    let url = "";
    routeName = routeName.split('?')[0];
    switch (routeName) {
        case "/":
        case "index":
            url = "/adminIndex/getData";
            break;
        case "/about":
        case "about":
            url = "/adminAbout/getData";
            break;
    };
    console.log(url, "url")
    return url;
}

/**
 * 
 * @param {string} routeUrl 
 * @returns 
 */
export const getPageI18nName = (routeUrl) => {
    let name = "";
    routeUrl = routeUrl.split('?')[0];
    switch (routeUrl) {
        case "/":
        case "index":
            name = "vueIndex";
            break;
        case "/about":
        case "about":
            name = "vueAbout";
            break;
    };
    return name;
}