export const formatTree = (/** @type {string | number} */ elKey, /** @type {any[]} */ data, /** @type {string | number} */ parentKEY, parentID = 0 ,root = [], level = 0) => {
    data = data.filter((/** @type {any} */ el) => el);
    data.forEach((/** @type {{ [x: string]: number; level: number; }} */ el, /** @type {any} */ idx) => {
        console.log(el,"el")
        if(el.level === level && parentID === el[parentKEY]){
            data.splice(idx,1,null);
            root.push(el);
        }
    });
    
    root.forEach((el, idx) => {
        if(!el) return ;
        console.log(el,"el")
        parentID = el[elKey]
        formatTree(elKey, data, parentKEY ,parentID ,el.children = [], (level + 1));
        if(!el.children[0]){
            delete el.children;
        }
    })
    return root
}