import { instance } from "./instance.js";

/**
 * 
 * @param {any} url 
 * @param {any} data 
 * @returns 
 */
export const POST =  (url, data) => {
    return instance.post(url, data);
}

/**
 * 
 * @param {any} url 
 * @param {any} data 
 * @returns {Promise<any>}
 */
export const GET =  (url, data) => {
    let str = "";
    
    Object.keys(data).map((el) => {
        if(!str){
            str += "?" + el + "=" + data[el];
        }else{
            str += "&" + el + "=" + data[el];
        }
    })

    return instance.get(url + str);
}

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
export const uploadFile = (url, data) => {
    return instance.post(url, data);
}