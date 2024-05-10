// 获取DOM的JSON树
/**
 * 
 * @param {*} rootDom 
 * @param {*} deepArr 
 * @param {*} idx
 * @returns 
 */
export const getDomJson = (rootDom = document.body, deepArr = [], idx = 0) => {
    return breadthCycle(deepArr, rootDom, null, "", idx);
};
// 字符串化JSON
export const stringJson = (/** @type {{ children: any; attrs: { [x: string]: string; }; tag: any; }} */ json) => {
    let str = "";
    let childrens = json.children;
    if (Array.isArray(childrens)) {
        childrens.forEach((el) => {
            str += stringJson(el);
        });
        let attr = "";
        for (let key in json.attrs) {
            if (json.attrs[key]) {
                attr += key + '="' + json.attrs[key] + '" ';
            } else {
                attr += key + ' ';
            }
        }
        return `<${json.tag} ${attr}>${str}</${json.tag}>`;
    } else {
        return `${json.children}`
    }
};
// 更新
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const patch = ({ oldVdom, newVdom, rootIdx = 0, dragEnter, deepTagArr }) => {
    // 比较旧的VDOM与新的VDOM将有差异的收集到数组，后更新数组数据，在初次比较时更新特殊标签的处理
    if (!dragEnter) updateChildrenSpecifyNode(newVdom)
    let hasChildren = Array.isArray(newVdom && newVdom.children);
    if (oldVdom && newVdom) {
        
        let attrStatus = patchAttrs(oldVdom, newVdom);
        if (oldVdom.el != newVdom.el || attrStatus || dragEnter) {
            if (dragEnter) {
                patchDragEnter(newVdom, oldVdom, rootIdx, deepTagArr);
            } else {
                patchJson(oldVdom, newVdom);
            }
        };

        if (hasChildren) {
            newVdom.children.forEach((/** @type {*} */ el, /** @type {*} */ idx) => {
                let status = patch({
                    oldVdom: oldVdom.children[idx],
                    newVdom: el,
                    rootIdx: idx,
                    dragEnter: dragEnter,
                    deepTagArr: deepTagArr
                });
                if (status == "add") {
                    oldVdom.children = Array.isArray(oldVdom.children) ? oldVdom.children : [];
                    oldVdom.children.push(el);
                } else if (status == "remove") {
                    oldVdom.children[idx] = null;
                }
            });
            oldVdom.children && oldVdom.children.filter && (oldVdom.children = oldVdom.children.filter((/** @type {any} */ e) => e));
        };
    } else if (!oldVdom && newVdom) {
        if (dragEnter) {
            mergeRootChildren(newVdom, false, rootIdx, deepTagArr);
        } else {
            deepUpdateChildrenSpacifyNode(newVdom);
        }
        // update newVdom to oldVdom
        return 'add';
    } else if (oldVdom && !newVdom) {
        // remove oldVdom
        return 'remove';
    }
};

/**
 * 
 * @param {*} newVdom 
 * @param {*} oldVdom 
 * @param {*} rootIdx 
 * @param {*} deepTagArr 
 */
const patchDragEnter = (newVdom, oldVdom, rootIdx, deepTagArr) => {
    if(Array.isArray(newVdom.children)){
        newVdom.children.forEach((/** @type {*} */ newElem, /** @type {*} */ idxNew) => {
            let hasCurrentElem;
            oldVdom.children && oldVdom.children.forEach((/** @type {*} */ oldElem,/** @type {*} */ idxOld) => {
                if (newElem.el == oldElem.el) {
                    hasCurrentElem = true;
                }
            });
            if (!hasCurrentElem) {
                mergeRootChildren(newVdom, false, rootIdx, deepTagArr);
            };
        });
    }
}

/**
 * 
 * @param {*} newVdom 
 */
const updateChildrenSpecifyNode = (newVdom) => {
    newVdom && newVdom.nodeType == "text" && replaceSpecify(newVdom);
}
/**
 * 
 * @param {*} newVDom 
 */
const deepUpdateChildrenSpacifyNode = (newVDom) => {
    newVDom.children && newVDom.children.forEach((/** @type {*} */ elem, /** @type {any} */ idx) => {
        if (Array.isArray(elem.children)) {
            deepUpdateChildrenSpacifyNode(elem);
        } else {
            updateChildrenSpecifyNode(elem);
        }
    })
};


const getDiff = (/** @type {any} */ diffArr, /** @type {any} */ oldVdom, /** @type {any} */ newVdom) => {

};

// 节点类型
/**
 * @type {*}
 */
const nodeTypes = {
    "1": "tag",
    "3": "text",
};
// 获取惟一键
const getuuid = (/** @type {number} */ len) => {
    const uuids = "qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOPASDFGHJKLZXCVBNM";
    let key = "";
    let lens = uuids.length;
    for (let i = 0; i < len; i++) {
        key += uuids[Math.floor(Math.random() * lens)]
    };
    return key;
};
// 获取属性
/**
 * 
 * @param {*} el 
 * @param {*} nodeType 
 * @returns 
 */
const getAttrs = (el, nodeType) => {
    /** @type {any} */
    let oAttr = {};
    if (typeof el == "string") {
        el = el.trim();
        el = el.replace(/([a-zA-z ]+)=(("|')[^"']+("|'))/g, (/** @type {any} */ a,/** @type {string} */ b,/** @type {string} */ c) => {
            oAttr[b.trim()] = c.trim();
            return "";
        });

        let elAttr = el.split(" ");
        elAttr.map((/** @type {string} */ key) => {
            oAttr[key.trim()] = "";
        });
    } else {
        const attrs = el.attributes;
        if (nodeType == 'tag') {
            let attrLen = attrs.length;
            for (let i = 0; i < attrLen; i++) {
                oAttr[attrs[i].nodeName] = attrs[i].nodeValue;
            };
        }
    }
    return oAttr;
};
// 深度循环
/**
 * 
 * @param {*} domEls 
 * @param {*} root 
 * @param {*} parent 
 * @param {*} deepArr 
 */
const deepLoop = (domEls, root, parent, deepArr) => {
    let elsLen = domEls.length;
    for (let i = 0; i < elsLen; i++) {
        breadthCycle(deepArr, domEls[i], root, parent, i);
    }
};
// 广度循环
/**
 * 
 * @param {*} deepArr 
 * @param {*} domEl 
 * @param {*} root 
 * @param {*} parent 
 * @param {*} breadthIdx 
 * @returns 
 */
const breadthCycle = (deepArr = [], domEl, root = [], parent, breadthIdx = 0) => {
    const childrens = domEl.childNodes;
    let deepPositionArr = [...deepArr].concat(breadthIdx);
    const nodeType = nodeTypes[domEl.nodeType];
    let elVDom = {
        nodeType: nodeType,
        tag: toLocalLow(domEl.tagName, nodeType),
        el: domEl,
        position: deepPositionArr,
        children: [],
        index: breadthIdx,
        parent: parent,
        key: getuuid(24),
        attrs: getAttrs(domEl, nodeType),
        selected: null
    };

    if (childrens.length > 0) {
        deepArr.push(breadthIdx);
        deepLoop(childrens, elVDom.children, elVDom, deepArr);
        deepArr.pop();
    } else {
        // @ts-ignore
        elVDom.children = getTextContent(domEl, nodeType);
        // replaceSpecify(elVDom);
    };
    root = root && root.push(elVDom) || elVDom;
    return root
};

// 小写字符串
/**
 * 
 * @param {*} str 
 * @param {*} nodeType 
 * @returns 
 */
const toLocalLow = (str, nodeType) => {
    if (nodeType == "tag") {
        return str.toLocaleLowerCase()
    }
};
// 获取文本内容
/**
 * 
 * @param {*} domEl 
 * @param {*} nodeType 
 * @returns 
 */
const getTextContent = (domEl, nodeType) => {
    let child = "";
    switch (nodeType) {
        case 'tag':
            child = domEl.innerText;
            break;
        case "text":
            child = domEl.nodeValue;
            break;
    };
    return child
};
// 替换特殊内容
/**
 * 
 * @param {*} elVDom 
 */
const replaceSpecify = (elVDom) => {
    let hasParagraphElem = hasTagName(elVDom, "p");
    let pTag = elVDom.parent && elVDom.parent.tag;
    if (pTag == "div") {
        if (hasParagraphElem) {
        }
        replacePToDIVElement(elVDom);
    } else if (hasParagraphElem) {
        if (!isRichLeafTag(pTag)) {
            replaceSpanToTextElement(elVDom);
        }
    } else if (!hasParagraphElem) {
        addParagraph(elVDom);
    }
};

/**
 * 
 * @param {*} nodeElement 
 * @param {*} TextNode 
 */
const addTextContent = (nodeElement, TextNode) => {
    nodeElement.textContent = nodeElement.textContent + TextNode.textContent;
    return nodeElement.textContent;
}
// 获取当前代码块中的最低子元素标签


/**
 * 
 * @param {*} ele 
 * @returns 
 */
const getStyle = function (ele) {
    var style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    } else {
        style = ele.currentStyle;
    }

    return style;
}

/**@type {*} */
const inlineDisplayList = ["inline", "inline-block"];
/**@type {*} */
const inlineElemList = ["img", "select", "textarea", "input", "button", "a", "abbr", "acronym",
    "b", "bdo", "big", "br", "cite", "code", "dfn", "em", "i", "kbd", "label", "q", "samp", "select",
    "small", "span", "strong", "sub", "sup", "textarea", "tt", "var", "u"];
// 查看是否是行级元素否则默认为块级元素
/**
 * 
 * @param {*} Vdom 
 * @returns {*}
 */
const isInlineElem = (Vdom) => {
    if (inlineElemList.indexOf(Vdom.tag) > -1) {
        return true;
    } else if (inlineDisplayList.indexOf(getStyle(Vdom.el).display) > -1) {
        return -1
    } else {
        return false;
    }
};

const richLeafArr = ["u", "i", "strong", "span"];

// 判断是否是富文本的指定标签
/**
 * 
 * @param {*} tagName 
 * @returns 
 */
const isRichLeafTag = (tagName) => {
    return tagName && richLeafArr.indexOf(tagName) > -1;
};

const richRootArr = ["p", "ul", "blockquote"];

/**
 * 
 * @param {*} tagName 
 * @returns 
 */
const isRichRootTag = (tagName) => {
    return richRootArr.indexOf(tagName) > -1;
}
// 当前当前文本是否有段落
/**
 * 
 * @param {*} vDom 
 * @param {*} tagName 
 * @returns {*}
 */
const hasTagName = (vDom, tagName) => {
    if (!vDom.parent) {
        return false;
    } else if (vDom.parent.tag == tagName) {
        return true;
    } else if (vDom.parent.tag != tagName) {
        return hasTagName(vDom.parent, tagName);
    }
};
// 将DIV标签替换成P
const replacePToDIVElement = (/** @type {{ parent?: any; el?: any; attrs?: any; tag?: any; children?: any; }} */ elVDom) => {
    let divVdom = elVDom.parent;
    const p = createElement("p");
    const span = createElement("span");
    if (!divVdom.parent) {
        if (divVdom.tag != 'span') {
            appendChild(p, span);
            resetDivAttrs(divVdom.el);
            replaceChild(divVdom.el, p, elVDom.el)
            appendChild(span, elVDom.el);
            const jsonToDiv = getDomJson(p, elVDom.parent.position);
            patchAttrs(jsonToDiv, elVDom);
            patchJson(elVDom, jsonToDiv);
            if (!divVdom.parent) { moveCursorToEnd(p); };
        }
        return;
    };
    appendChild(p, span);
    resetDivAttrs(divVdom.parent.el);
    replaceChild(divVdom.parent.el, p, divVdom.el);
    appendChild(span, elVDom.el);
    const jsonToDiv = getDomJson(p, divVdom.parent.position);
    patchAttrs(jsonToDiv, divVdom);
    patchJson(divVdom, jsonToDiv);
    if (!divVdom.parent) { moveCursorToEnd(p); };
};
/**
 * 
 * @param {*} divEl 
 */
const resetDivAttrs = (divEl) => {
    let attrs = divEl.attributes;
    for (let attr of attrs) {
        let attrName = attr.split && attr.split("=")[0];
        if (attrName) divEl.removeAttribute(attrName);
    }
};

/**
 * 
 * @param {any} oldJson
 * @param {any} newJson
 * @param {any} firstInit
 */
export const patchJson = (oldJson, newJson, firstInit = true) => {
    if (Array.isArray(newJson.children)) {
        let oldIsArray = Array.isArray(oldJson.children);
        oldJson.children = oldIsArray ? oldJson.children : [];
        newJson.children.forEach((elem, idx) => {
            if (!oldJson.children[idx]) {
                oldJson.children[idx] = {};
            }
            patchJson(oldJson.children[idx], elem, false)
        })
    }
    Object.keys(newJson).map((el) => {
        if (el == "selected" && oldJson[el] || firstInit && el == "parent") {
            if (el == "selected" && oldJson[el]) {
                newJson[el] = oldJson[el];
            }
            return;
        }
        oldJson[el] = newJson[el]
    });

    if (firstInit) {
        updateJsonParentEl(oldJson, newJson);
        newJson.children.forEach((el) => {
            el.parent = oldJson;
        })
    }
};

/**
 * 
 * @param {*} oldJson 
 * @param {*} newJson 
 */
const updateJsonParentEl = (oldJson, newJson) => {
    if (oldJson.parent && newJson.parent && newJson.parent.el && oldJson.parent.el) {
        oldJson.parent.el = newJson.parent.el
        if (newJson.parent.parent) {
            updateJsonParentEl(oldJson.parent, newJson.parent)
        }
    } else if (!newJson.parent && oldJson.parent) {
        newJson.parent = oldJson.parent;
    };
};

// 添加段落标签
/**
 * 
 * @param {*} elVDom 
 * @returns 
 */
const addParagraph = (elVDom) => {
    if (!elVDom.parent) return;
    const p = createElement("p");
    let getDomCopy;
    if (elVDom.parent.tag == "span") {
        const parentVDOM = elVDom.parent;
        if (!parentVDOM.parent) return;
        getDomCopy = cloneNode(parentVDOM, true);
        appendChild(p, getDomCopy);
        let appendJson = getDomJson(p, parentVDOM.parent.position);
        replaceChild(parentVDOM.parent.el, p, parentVDOM.el)
        patchJson(parentVDOM, appendJson);
    } else {
        const parentVDOM = elVDom.parent;
        const span = createElement("span");
        getDomCopy = cloneNode(elVDom, true);
        appendChild(p, span);
        appendChild(span, getDomCopy);
        let appendJson = getDomJson(p, elVDom.parent.position);
        replaceChild(parentVDOM.el, p, elVDom.el);
        patchJson(elVDom, appendJson);
    };
    moveCursorToEnd(p);
};
// 将没有span包住的文本元素替换成SPAN包住的文本元素
/**
 * 
 * @param {*} elVDom 
 */
const replaceSpanToTextElement = (elVDom) => {
    const span = createElement("span");
    const cloneText = cloneNode(elVDom, true);
    appendChild(span, cloneText);
    replaceChild(elVDom.parent.el, span, elVDom.el)
    const replaceJson = getDomJson(span, elVDom.parent.position);
    patchJson(elVDom, replaceJson);
    moveCursorToEnd(elVDom.parent.el);
};
// 更新属性
/**
 * 
 * @param {*} oldVdom 
 * @param {*} newVdom 
 * @returns 
 */
const patchAttrs = (oldVdom, newVdom) => {
    let attrStatus = false;
    let oldAttr = oldVdom.attrs;
    let newAttr = newVdom.attrs;
    let resetUndefined;
    if (!oldAttr && !newAttr) return;

    oldAttr = oldAttr || {};
    newAttr = newAttr || {};

    for (let key in oldAttr) {
        if (newAttr[key] !== resetUndefined && oldAttr[key] != newAttr[key]) {
            oldAttr[key] = newAttr[key];
            oldVdom.el.setAttribute(key, newAttr[key]);
            if (!attrStatus) attrStatus = true;
            delete newAttr[key];
        } else if (oldAttr[key] == newAttr[key]) {
            delete newAttr[key];
            continue;
        } else {
            delete oldAttr[key];
            oldVdom.el.removeAttribute(key);
        }
    };
    for (let key in newAttr) {
        oldAttr[key] = newAttr[key];
        oldVdom.el.setAttribute(key, newAttr[key]);
        if (!attrStatus) attrStatus = true;
    };
    return attrStatus;
};
// 到动光标到当前元素的最后方
/**
 * 
 * @param {*} element 
 */
const moveCursorToEnd = (element) => {
    var range = document.createRange();
    /** @type {*} */
    var selection = window.getSelection();

    // 将 Range 设置为编辑元素的最后
    range.selectNodeContents(element);
    range.collapse(false);

    // 清除当前 Selection 并将 Range 添加到 Selection 中
    selection.removeAllRanges();
    selection.addRange(range);

    // 设置焦点到编辑元素
    element.focus();
};

// 将字符串化的 json 格式化为 AST;
/**
 * 
 * @param {string} str 
 */
export const jsonStrToAst = (str) => {
    /** @type {any} */
    let runObj = {};
    /** @type {any} */
    let activeObject;

    runObj.originSource = str;
    runObj.tagReg = /^<\/?([^>]+)>/i;
    runObj.textReg = /([^<]+)</i;
    runObj.offsetLeft = 0;
    runObj.tagStack = [];
    runObj.ast = null;
    runObj.__proto__.mountToEl = mountToEl;
    let i = 0;

    while (str) {
        /** @type {any} */
        let startMatch = str.match(runObj.tagReg);
        /** @type {string} */
        let tagMark = startMatch && startMatch[0];
        let tagName = startMatch && startMatch[1];
        let isEndTag = str.startsWith(tagMark) && str.startsWith("</");
        let subStrLen = tagMark && tagMark.length || 0;
        let strlen = str.length;
        /** @type {any} */
        let tagProps = tagName && tagName.replace(/\S+/, (/** @type {any} */ a) => {
            tagName = a;
            return "";
        });
        let nodeType;

        /** @type {any} */
        let initObject = {
            nodeType: 1,
            tag: tagName,
            position: [runObj.offsetLeft],
            children: [],
            parent: null,
            key: getuuid(24),
            attrs: null,
            selected: null
        };

        if (isEndTag) {
            let popStack = activeObject;
            if (popStack.tag == tagName) {
                activeObject.position.push(runObj.offsetLeft + subStrLen)
                activeObject = activeObject.parent
            } else {
                subStrLen = 0;
                runObj.tagStack.push(popStack);
                console.warn("标签对错误 标签名称：" + popStack.tag + "; 标签位置：" + runObj.offsetLeft);
            }
        } else if (str.startsWith(tagMark)) {

            initObject.tag = tagName;
            initObject.attrs = getAttrs(tagProps, nodeType);

            if (activeObject) {
                let pushObject = Array.isArray(activeObject) ? activeObject : activeObject.children;
                pushObject.push(initObject);
                initObject.parent = activeObject;
                activeObject = activeObject.children[activeObject.children.length - 1];
            } else {
                initObject.parent = null;
                runObj.tagStack.push(initObject);
                activeObject = runObj.tagStack[0];
            }
            let currentElement = createElement(tagName);
            initObject.parent && appendChild(initObject.parent.el, currentElement);
            initObject.el = currentElement;
        } else {
            let textMatch = str.match(runObj.textReg);
            /** @type {any} */
            let textContent = textMatch && textMatch[1];
            subStrLen = textContent.length || 0;
            initObject.nodeType = 3;
            initObject.parent = activeObject;
            initObject.tag = null;
            initObject.children = textContent;
            initObject.position = [runObj.offsetLeft, runObj.offsetLeft + subStrLen];
            activeObject.children = initObject;
            let currentTextNode = createTextNode(textContent);
            initObject.parent && appendChild(initObject.parent.el, currentTextNode);
            initObject.el = currentTextNode
        };
        str = str.substring(subStrLen, strlen);
        runObj.offsetLeft += subStrLen;
    }
    return runObj;
};
/**
* @this {any}
*/
const mountToEl = function (/** @type {string} */ idName) {
    let idElement = document.getElementById(idName);
    this.tagStack[0].children.map((/** @type {*} */ el) => {
        appendChild(idElement, el.el);
    })
};

// 判断是自闭合标签
/**
 * 
 * @param {string|null} tag 
 * @returns 
 */
const isSelfClosing = (tag) => {
    let status = false;
    switch (tag) {
        case "br":
        case "img":
        case "hr":
        case "input":
            status = true;
            break;
        default:
            status = false;
            break;
    };
    return status;
};

/**
 * 
 * @param {*} astDom 
 * @param {*} selectAst
 */
export const getSelectContent = (astDom, selectAst) => {
    /**
     * @type {*}
     */
    let selects = winGetSelection();
    let startTextEl = selects.anchorNode;
    let anchorOffset = selects.anchorOffset;
    let focusOffset = selects.focusOffset;
    let startOffset = anchorOffset;
    let endTextEl = selects.focusNode;
    let endOffset = focusOffset;
    if (startTextEl == endTextEl && anchorOffset == focusOffset) { return [] };

    // 选择
    if (startTextEl == astDom.el) { return []; };
    let startDeepArr = getDeepArr(astDom.el, getSelectTextElem(startTextEl));
    let endDeepArr = getDeepArr(astDom.el, getSelectTextElem(endTextEl));
    let selectAstContent = updateAstSelect(astDom, startDeepArr, startOffset, endDeepArr, endOffset);
    return selectAstContent

};

const getSelectTextElem = (domElem) => {
    if (domElem.nodeType == 1) {
        return getSelectTextElem(domElem.childNodes[0])
    } else {
        return domElem;
    }
}

/**
 * 
 * @returns {*}
 */
const winGetSelection = () => {
    return window.getSelection()
}

/**
 * 
 * @param {*} astDom 
 * @param {*} startDeepArr 
 * @param {*} startOffset 
 * @param {*} endDeepArr 
 * @param {*} endOffset 
 */
const updateAstSelect = (astDom, startDeepArr, startOffset, endDeepArr, endOffset) => {
    let startElem = getSelectAst(astDom, startDeepArr);
    let endElem = getSelectAst(astDom, endDeepArr);
    let direction = "", selectLeaf = [], position;

    /**
     * @type {any}
     */
    let selectAst = [];
    // 移动方向 结束位置大小起始位置 也就是向下选择
    direction = getMouseDirection(endDeepArr, startDeepArr);
    
    let startAst = getMiddleSelectAst(startDeepArr, startElem, direction, startOffset, "start");
    let endAst = getMiddleSelectAst(endDeepArr, endElem, (direction == "up" ? "down" : "up"), endOffset, "end");

    if (startElem.position[1] == endElem.position[1]) {
        startAst.forEach((el, idx) => {
            if (endAst.indexOf(el) < 0) {
                startAst.splice(idx, 1, null);
            }
        });
        selectAst = startAst.filter(e => e);
    } else {
        selectAst = startAst
        let paragraphLists = astDom.children;
        let startIdx = startElem.position[1];
        let endIdx = endElem.position[1];
        if (direction == "down") {
            endIdx = startElem.position[1];
            startIdx = endElem.position[1];
        }
        for (let i = endIdx + 1; i < startIdx; i++) {
            selectAst = selectAst.concat(getChildTreeAst([], paragraphLists[i]));
        };
        selectAst = selectAst.concat(endAst);
    };
    return selectAst;
};

/**
 * 
 * @param {any} endDeepArr
 * @param {any} startDeepArr
 * @returns
 */
const getMouseDirection = (endDeepArr, startDeepArr) => {
    let direction;
    endDeepArr.some((/** @type {number} */ el, /** @type {string | number} */ idx) => {
        if (idx == (endDeepArr.length - 1) && !direction) {
            direction = "down";
            return true;
        } else if (el > startDeepArr[idx]) {
            direction = "down";
            return true;
        } else if (el < startDeepArr[idx]) {
            direction = "up";
            return true
        }
    });
    return direction;
}

/**
 * 
 * @param {*} deepArr 
 * @param {*} childAstVDom 
 * @param {*} direction 
 * @param {*} offset
 * @param {*} position
 */
const getMiddleSelectAst = (deepArr, childAstVDom, direction, offset, position) => {
    let deepArrLen = deepArr.length;
    let deepCopyArr = Array.from(deepArr);
    /**
     * @type {any[]}
     */
    let returnSelectAst = [];
    let idx = deepCopyArr.pop();
    while ((idx || idx === 0) && childAstVDom.parent) {
        let childrens = childAstVDom.parent.children;
        let childLen = childrens.length;
        let deepCopyArrLen = deepCopyArr.length;
        let threeStr = position;
        if (deepCopyArrLen == (deepArrLen - 1)) {
            if (childLen > 1) {
                let selectAst;
                returnSelectAst = returnSelectAst.concat(childrens);
                if (direction == "up") {
                    selectAst = returnSelectAst[returnSelectAst.length - 1];
                    selectAst.selected = position == "start" ? [0, offset, threeStr] : [offset, childAstVDom.children.length, threeStr];
                } else {
                    selectAst = returnSelectAst[0];
                    selectAst.selected = position == "start" ? [offset, childAstVDom.children.length, , threeStr] : [0, offset, threeStr];
                }
            } else {
                if (childAstVDom.selected) {
                    let selectedArr = childAstVDom.selected;
                    if (direction == "up") {
                        selectedArr[1] = offset;
                    } else {
                        selectedArr[0] = offset;
                    };
                    selectedArr.sort();
                    if (selectedArr[0] > selectedArr[1]) {
                        let origin = selectedArr[1];
                        selectedArr[1] = selectedArr[0];
                        selectedArr[0] = origin;
                    }
                } else {
                    childAstVDom.selected = direction == "up" ? [0, offset, threeStr] : [offset, childAstVDom.children.length, threeStr];
                }
                returnSelectAst.push(getParentVdom(childAstVDom, "span"));
            };
        } else if (childLen > 1) {
            // 如果索引为0时并且 当前节点的父节点有子节点数量为1为选中当前节点
            // 如果索引不为0且相邻节点数据大于0 此时需要判断是向上选择或都向下选择
            childrens.map && childrens.map((/** @type {any} */ el, /** @type {any} */ idxChild) => {
                if (direction == "up" && idx < idxChild) return;
                if (direction == "down" && idx > idxChild) return;
                if (idxChild != idx) {
                    returnSelectAst = returnSelectAst.concat(getChildTreeAst([], el));
                }
            });
        };
        if (deepCopyArrLen < 2) { break; };
        idx = deepCopyArr.pop();
        childAstVDom = childAstVDom.parent;
    };
    return returnSelectAst;
};

/**
 * 
 * @param {*} collectArr 
 * @param {*} astDom 
 */
const getChildTreeAst = (collectArr, astDom) => {
    if (astDom.tag == 'span') {
        collectArr = collectArr.concat(astDom);
    } else {
        astDom.children && astDom.children.map && astDom.children.map((/** @type {any} */ el, /** @type {any} */ idx) => {
            collectArr = getChildTreeAst(collectArr, el);
        });
    }
    return collectArr;
};

/**
 * 
 * @param {*} astDom 
 * @param {*} deepArr 
 * @returns 
 */
const getSelectAst = (astDom, deepArr) => {
    let copyDeepArr = Array.from(deepArr);
    let startPosition = copyDeepArr.shift();
    let childrens = astDom.children;
    let startElemAst;
    while (startPosition || startPosition === 0) {
        startElemAst = childrens[startPosition];
        childrens = startElemAst.children;
        startPosition = copyDeepArr.shift();
    };
    return startElemAst;
};

const resetSelectRange = (selectAst) => {
    let startElement, endtElement, startOffset, endOffset;

    if (selectAst.length == 1) {
        let textVdom = getLeafText(selectAst[0]);
        startElement = textVdom;
        endtElement = textVdom;
        startOffset = textVdom.selected && textVdom.selected[1];
        endOffset = textVdom.selected && textVdom.selected[0];
    } else {
        selectAst.forEach((elem, idx) => {
            let textVdom = getLeafText(elem);

            if (textVdom.selected) {
                if (textVdom.selected[2] == "start") {
                    startElement = textVdom
                    startOffset = textVdom.selected[1];
                } else if (textVdom.selected[2] == "end") {
                    endtElement = textVdom;
                    endOffset = textVdom.selected[0];
                }
            }
            // 判断向上选还是向下选
            // 改动获取选择值的方式，有BUG需要调整
        });
    }

    if (!endtElement || !startElement) {
        const selection = winGetSelection();
        selection.removeAllRanges();
        return;
    }

    if (startElement != endtElement) {
        let d = getMouseDirection(endtElement.position, startElement.position);
        if (d == "down") {
            let cacheStart = startElement;
            startElement = endtElement;
            endtElement = cacheStart;
            endOffset = endtElement.selected[0];
            startOffset = startElement.selected[1];
        }
    }


    const selection = winGetSelection();
    const range = createRange();
    range.setStart(endtElement.el, endOffset);
    range.setEnd(startElement.el, startOffset);

    selection.removeAllRanges();
    selection.addRange(range);

}

const createRange = () => {
    return document.createRange();
}



/**
 * 
 * @param {*} selectAst 
 */
export const resetSelectPosition = (selectAst) => {
    resetSelectRange(selectAst);
    let select = selectAst.pop();
    while (select) {
        deleteVdomSelected(select);
        deepClearSelected(select.children);
        select = selectAst.pop();
    };
};

/**
 * 
 * @param {*} childrens 
 */
const deepClearSelected = (childrens) => {
    if (Array.isArray(childrens)) {
        childrens.forEach((elem, idx) => {
            deleteVdomSelected(elem);
            if (elem.children) {
                deepClearSelected(elem.children);
            }
        })
    }
};

const deleteVdomSelected = (select) => {
    if (select.selected) {
        select.selected = null;
    };
}

// 加粗选中文本
/**
 * 
 * @param {*} selectAst 
 * @param {*} status 
 */
export const bold = (selectAst, status = false) => {
    appendTagToText(selectAst, status, "strong");
};

/**
 * 
 * @param {any} selectAst
 * @param {any} status
 */
export const underline = (selectAst, status = false) => {
    appendTagToText(selectAst, status, "u");
};

/**
 * 
 * @param {any} selectAst
 * @param {any} status
 */
export const italics = (selectAst, status = false) => {
    appendTagToText(selectAst, status, "i");
};

/**
 * 
 * @param {*} selectAst 
 * @param {*} unBoldStatus 
 */
const appendTagToText = (selectAst, unBoldStatus, appendLeafTag) => {
    selectAst.map && selectAst.map((/** @type {*} */ elem) => {
        if (elem.nodeType == "text") {
            let selectedArr;
            let hasLeafTag = hasTagName(elem, appendLeafTag);
            if (unBoldStatus && hasLeafTag) {
                unTagName(elem, appendLeafTag);
            } else if (!unBoldStatus && !hasLeafTag) {
                let appendElem = createElement(appendLeafTag);
                let select = elem.selected;
                let textNode = elem.el;
                let splitTextArr = [];
                let spanLeafVdom = getParentVdom(elem, "span");
                let detaultIdx = spanLeafVdom.index;
                let PVdom = getParentVdom(elem);
                let childrens = PVdom.children;
                let newJson;
                if (select) {
                    selectedArr = elem.selected;
                    deleteVdomSelected(elem);
                    if (select[0] == 0 && select[1] == 0) {
                        return;
                    };
                    if (select[1] != elem.children.length && select[0] == 0) {
                        let splitText = elem.el.splitText(select[1]);
                        let splitLeafVdom = createSpanFillText(splitText, "after");
                        textNode = elem.el;
                        splitTextArr.push(textNode); ``
                        splitTextArr.push(splitLeafVdom);
                    } else if (select[1] == elem.children.length && select[0] == 0) {
                        textNode = elem.el;
                        // 压入数组最后一截文字
                        splitTextArr.unshift(textNode);
                    } else if (select[1] == elem.children.length && select[0] != 0) {
                        textNode = elem.el.splitText(select[0]);
                        // 压入数组最后一截文字
                        splitTextArr.unshift(textNode);
                        // 最开始一截文字用元素包住
                        splitTextArr.unshift(createSpanFillText(elem.el, "insert"));
                    } else {
                        let splitLast = elem.el.splitText(select[1]);
                        // 最后一截文字用元素包住
                        splitTextArr.push(createSpanFillText(splitLast, "after"));
                        // 中间一截文字
                        textNode = elem.el.splitText(select[0]);
                        // 压入数组最中间一截文字
                        splitTextArr.unshift(textNode);
                        // 最开始一截文字用元素包住
                        splitTextArr.unshift(createSpanFillText(elem.el, "insert"));
                    }
                } else {
                    replaceChild(elem.parent.el, appendElem, textNode);
                    appendChild(appendElem, textNode);
                    newJson = getDomJson(spanLeafVdom.el, PVdom.position, detaultIdx);
                    patchJson(spanLeafVdom, newJson);
                    return;
                }
                splitTextArr.map((el, idx) => {
                    if (el == textNode) {
                        replaceChild(elem.parent.el, appendElem, textNode);
                        appendChild(appendElem, textNode);
                        newJson = getDomJson(spanLeafVdom.el, PVdom.position, detaultIdx + idx);
                        let textLeafVdom = getLeafText(newJson);
                        selectedArr[0] = 0;
                        selectedArr[1] = textLeafVdom.children.length;
                        textLeafVdom.selected = selectedArr;
                        patchJson(spanLeafVdom, newJson);
                    } else {
                        newJson = getDomJson(el, PVdom.position, detaultIdx + idx);
                        childrens.splice(detaultIdx + idx, 0, newJson);
                        newJson.parent = PVdom;
                    }
                });
                return;
            };
            let rootVdom = getParentVdom(elem);
            let position = rootVdom.position;
            const newJson = getDomJson(rootVdom.el, position, position[position.length - 1]);
            patchJson(rootVdom, newJson);
        } else {
            appendTagToText(elem.children, unBoldStatus, appendLeafTag);
        }
    })
};

const inertElement = (/** @type {any} */ parentNode, /** @type {any} */ inertNode) => {
    parentNode.before(inertNode);
};

const afterElement = (/** @type {any} */ parentNode, /** @type {any} */ afterNode) => {
    if (parentNode.nextSibling) {
        parentNode.nextSibling.before(afterNode);
    } else {
        appendChild(parentNode.parentNode, afterNode);
    }
};


const createSpanFillText = (/** @type {any} */ fillText, /** @type {any} */ direction) => {
    if (fillText.textContent == "" || fillText.tagName && fillText.tagName.toLocaleLowerCase() == "br") return;
    // 此处需要收集部分到根节点的序列组创建添加
    let span = createElement("span");
    let parentNode = fillText.parentNode;
    appendChild(span, fillText);
    if (direction == "after") {
        afterElement(parentNode, span);
    } else {
        inertElement(parentNode, span);
    }
    return span;
};

/**
 * 
 * @param {*} elName 
 * @returns 
 */
const createElement = (elName) => {
    return document.createElement(elName);
};

/**
 * 
 * @param {*} oldElem 
 * @param {*} status 
 */
const cloneNode = (oldElem, status) => {
    if (oldElem.nodeType == "3") {
        return createTextNode(oldElem.nodeValue);
    } else {
        return oldElem.el.cloneNode(status);
    }
};

/**
 * 
 * @param {*} parentNode 
 * @param {*} childNode 
 */
const appendChild = (parentNode, childNode) => {
    return parentNode.appendChild(childNode);
};

/**
 * 
 * @param {*} parentElem 
 * @param {*} newNode 
 * @param {*} oldNode 
 */
const replaceChild = (parentElem, newNode, oldNode) => {
    return parentElem.replaceChild(newNode, oldNode);
};

/**
 * 
 * @param {*} string 
 */
const createTextNode = (string) => {
    return document.createTextNode(string);
};

/**
 * 
 * @param {*} astVdom 
 * @param {*} tagName 
 * @returns {*}
 */
const getParentVdom = (astVdom, tagName) => {
    if (tagName && astVdom.tag == tagName) {
        return astVdom;
    } else if (richRootArr.indexOf(astVdom.tag) > -1) {
        return astVdom;
    } else if (astVdom.parent) {
        return getParentVdom(astVdom.parent, tagName);
    }
}

/**
 * 
 * @param {*} astVdom 
 * @returns {*}
 */
const getLeafText = (astVdom) => {
    if (astVdom.nodeType == "text") {
        return astVdom;
    } else if (Array.isArray(astVdom.children)) {
        return getLeafText(astVdom.children[0]);
    }
}

/**
 * 
 * @param {any} astVdom
 * @param {any} tagName
 */
const unTagName = (astVdom, tagName) => {
    let getLeafTextVdom = getLeafText(astVdom);
    let leafSpanVdom = getParentVdom(getLeafTextVdom, "span");
    let leafElemVdom = getParentVdom(getLeafTextVdom, tagName);
    appendChild(leafElemVdom.parent.el, leafElemVdom.children[0].el);
    removeChild(leafElemVdom);
    mergeSpan(getLeafTextVdom);
};

const mergeSpan = (vDom) => {
    let vP = vDom.parent;
    if (vP.tag == "span" && vDom.nodeType == "text") {
        let sameLevels = vDom.parent.parent.children;
        let prevVdom, nextVdom;
        sameLevels.forEach((elem, idx) => {
            if (elem == vP) {
                let prevIdx = idx - 1;
                let nextIdx = idx + 1;
                prevVdom = sameLevels[prevIdx];
                nextVdom = sameLevels[nextIdx];
                if (nextVdom.children && nextVdom.children[0] && nextVdom.children[0].nodeType == "text") {
                    addTextContent(vP.el, nextVdom.children[0].el);
                    sameLevels.splice(nextIdx, 1);
                };
                if (prevVdom.children && prevVdom.children[0] && prevVdom.children[0].nodeType == "text") {
                    addTextContent(vP.el, prevVdom.children[0].el);
                    sameLevels.splice(prevIdx, 1);
                };
            };
        });
    }
}

/**
 * 
 * @param {*} root 
 * @param {*} findPositionEl 
 * @param {*} deepArr 
 */
const getDeepArr = (root, findPositionEl, deepArr = []) => {
    let childIdx = null;
    let childres = findPositionEl.parentNode.childNodes;
    for (let i = 0; i < childres.length; i++) {
        if (findPositionEl == childres[i]) {
            childIdx = i;
            break;
        }
    };

    deepArr.unshift(childIdx);
    if (findPositionEl.parentNode != root) {
        getDeepArr(root, findPositionEl.parentNode, deepArr);
    };
    return deepArr;
};

/**
 * 
 * @param {*} astDom 
 */
export const getCurrentMouseElem = (astDom, anchorNode = winGetSelection().anchorNode) => {
    if (!astDom.children) return;
    let rootDom = astDom.el;
    let deepArr, pasetVdom, pack,
        /**@type {*} */
        tagArr;
    if (astDom.el != anchorNode) {
        tagArr = []
        deepArr = getDeepArr(rootDom, anchorNode);
        pasetVdom = getSelectAst(astDom, deepArr);
        getDeepTagArr(pasetVdom, tagArr)
    }
    return tagArr[0] ? tagArr : pack;
}

/**
 * 
 * @param {*} pasetText 
 * @param {*} astDom 
 * @returns 
 */
export const formatPaste = (pasetText, astDom) => {
    let selects = winGetSelection();
    let deepArr, offsetLeft, pasetVdom, inserVdom, insertElem, tagArr;
    /**@type {*} */
    let lineReg = /(.+)\r?\n/;
    let regText = lineReg.exec(pasetText);
    let rootDom = astDom.el;

    if (astDom.el != selects.anchorNode) {
        deepArr = getDeepArr(rootDom, selects.anchorNode);
        offsetLeft = selects.anchorOffset;
        pasetVdom = getSelectAst(astDom, deepArr);
        inserVdom = astDom.children[deepArr[0]];
        if (pasetVdom.children.length == offsetLeft) {
            tagArr = tagArr || [];
            getDeepTagArr(pasetVdom, tagArr);
        } else if (offsetLeft == 0) {
            tagArr = tagArr || [];
            getDeepTagArr(pasetVdom, tagArr);
        } else {
            tagArr = tagArr || [];
        }
    } else {
        insertElem = rootDom.lastChild;
    };

    // console.log(regText, "regText", pasetText)
    while (regText) {
        pasetText = pasetText.substr(regText[0].length);
        const currentLineData = regText[1];
        let rootAndLeaf = createDefaultRootAndLeaf(tagArr);
        // addTextContent(rootAndLeaf[1], createTextNode(currentLineData.replace(/(\s+)/, (a, b, c) => {
        //     if (b && b.length) {
        //         let val = new Array(b.length).fill("\r\n").join("");
        //         return val;
        //     } else {
        //         return "";
        //     }
        // })));
        addTextContent(rootAndLeaf[1], createTextNode(currentLineData));
        if (insertElem) {
            afterElement(insertElem, rootAndLeaf[0]);
        } else {
            appendChild(rootDom, rootAndLeaf[0]);
        }
        insertElem = rootAndLeaf[0]
        regText = lineReg.exec(pasetText);
    };
    return regText;
}

/**
 * 
 * @param {*} defaultTagArr 
 * @returns 
 */
const createDefaultRootAndLeaf = (defaultTagArr = ["p", "span"]) => {
    let rootElem, leafElem;
    for (let i = 0; i < defaultTagArr.length; i++) {
        if (rootElem) {
            let appendElem = createElement(defaultTagArr[i]);
            appendChild(leafElem, appendElem);
            leafElem = appendElem;
        } else {
            rootElem = createElement(defaultTagArr[i]);
            leafElem = rootElem;
        }
    }
    return [rootElem, leafElem];
}

/**
 * 
 * @param {*} leafVdom 
 * @param {*} tagArr 
 */
const getDeepTagArr = (leafVdom, tagArr) => {
    if (leafVdom.parent && leafVdom.parent.parent) {
        tagArr.unshift(leafVdom.parent.tag);
        return getDeepTagArr(leafVdom.parent, tagArr);
    } else {
        return tagArr;
    }
}

// 合并根节点下的子节点并将子点节内容分成三级，一级段落，一级span 一级文本 拖动或粘帖进来的时候
/**
 * 
 * @param {*} Vdom 
 * @param {*} preVdom 
 * @param {*} defaultIndex 
 * @param {*} deepTagArr 
 * @returns 
 */
const mergeRootChildren = (Vdom, preVdom = false, defaultIndex = 0, deepTagArr) => {
    let vDomParent = Vdom.parent;
    if (vDomParent && vDomParent.parent && !preVdom) {
        mergeRootChildren(vDomParent, preVdom, defaultIndex, deepTagArr);
    }
    if (!preVdom) {
        if (vDomParent && !vDomParent.parent) {
            preVdom = getCurrentVDomPrevVDom(vDomParent, Vdom);
        }
    };
    if (!preVdom) return;
    /**
     * @type {*}
     */
    let leafElem, rootBlock;
    let childres = Vdom.children;
    if (preVdom == "first") {
        const defaultNode = createDefaultRootAndLeaf();
        rootBlock = defaultNode[0];
        leafElem = defaultNode[1];
        const rootVdom = getRootDom(Vdom);
        if (rootVdom == Vdom.parent && typeof Vdom.children == "string") {
            appendChild(leafElem, createTextNode(Vdom.children))
            replaceChild(Vdom.el.parentNode, rootBlock, Vdom.el);
        } else {
            replaceChild(Vdom.el.parentNode, rootBlock, Vdom.el);
        };
    } else if (preVdom.tag) {
        const defaultNode = createDefaultRootAndLeaf(deepTagArr);
        rootBlock = defaultNode[0];
        leafElem = defaultNode[1];
        replaceChild(Vdom.el.parentNode, rootBlock, Vdom.el);
    } else {
        leafElem = preVdom;
        if (Vdom.nodeType == "text") {
            // appendChild(preVdom, Vdom.el);
            addTextContent(preVdom, Vdom.el);
        } else if (childres && childrenISinline(childres) && !isInlineElem(Vdom)) {
            const defaultNode = createDefaultRootAndLeaf(deepTagArr);
            rootBlock = defaultNode[0];
            leafElem = defaultNode[1];
            let rootVdom = getRootDom(Vdom);
            appendChild(rootVdom.el, rootBlock);
        }
    };
    // 收集内容并添加到前一个内容的元素中 或 创建前一个内容的子元素，并压入前一个元素中
    if (Array.isArray(childres)) {
        childres.forEach((/** @type {any} */ elem, /** @type {any} */ idx) => {
            mergeRootChildren(elem, leafElem, defaultIndex, deepTagArr);
        });
    };

    if (preVdom.tag || preVdom == "first") {
        const jsonToDiv = getDomJson(rootBlock, Vdom.parent.position, defaultIndex);
        patchAttrs(Vdom, jsonToDiv);
        patchJson(Vdom, jsonToDiv);
    }
};

/**
 * 
 * @param {*} rootVdom 
 * @param {*} Vdom 
 */
const getCurrentVDomPrevVDom = (rootVdom, Vdom) => {
    let rootChildrens = rootVdom.children;
    let preVdom;
    rootChildrens.forEach((/** @type {any} */ elem, /** @type {number} */ idx) => {
        if (Vdom == elem) {
            if (!idx) {
                preVdom = "first";
            } else {
                preVdom = rootChildrens[idx];
            }
        }
    });
    return preVdom;
}

/**
 * 
 * @param {*} childres 
 * @returns 
 */
const childrenISinline = (childres) => {
    let childrenISinline = false;
    for (let i = 0; i < childres.length; i++) {
        let elem = childres[i]
        if ((elem.nodeType == "tag" && isInlineElem(elem)) || elem.nodeType == "text") {
            childrenISinline = true;
            break;
        }
    }
    return childrenISinline;
}

/**
 * 
 * @param {*} vDom 
 * @returns {*}
 */
const getRootDom = (vDom) => {
    if (vDom.parent) {
        return getRootDom(vDom.parent)
    } else {
        return vDom;
    }
}

// 获取粘帖的图片
/**
 * 
 * @param {*} event 
 * @returns 
 */
export const getImage = (event) => {
    let items = event.clipboardData && event.clipboardData.items;
    let file = null;
    if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
                break;
            }
        }
    };
    return file
}

/**
 * 
 * @param {*} selectAst 
 */
export const clearSelectContent = (selectAst) => {
    selectAst.forEach((/** @type {*} */ elem, /** @type {*} */ idx) => {
        let hasSelectedTextVdom = childrenHasSelect(elem);
        if (hasSelectedTextVdom) {
            let endOffset = hasSelectedTextVdom.selected[1];
            let childrenlen = hasSelectedTextVdom.children.length;
            let startOffset = hasSelectedTextVdom.selected[0];
            if (childrenlen == endOffset && startOffset == 0) {
                clearParentNull(elem);
            } else if (startOffset == 0 && endOffset != childrenlen) {
                removeChild(hasSelectedTextVdom, hasSelectedTextVdom.el.splitText(endOffset))
            } else if (endOffset == childrenlen && startOffset != 0) {
                hasSelectedTextVdom.el.splitText(endOffset);
                removeChild(hasSelectedTextVdom, hasSelectedTextVdom.el);
            } else {
                let splitElem = hasSelectedTextVdom.el.splitText(endOffset);
                let startElem = splitElem.splitText(startOffset);
                removeChild(hasSelectedTextVdom, splitElem);
            }
        } else {
            clearParentNull(elem);
        }
        // elem.el.
    })
};

/**
 * 
 * @param {*} astVdom 
 */
const clearParentNull = (astVdom) => {
    removeChild(astVdom);
    if (astVdom.parent && astVdom.parent.children && astVdom.parent.children.length == 1) {
        clearParentNull(astVdom.parent);
    }
}

/**
 * 
 * @param {*} astVdom 
 * @returns {*}
 */
const childrenHasSelect = (astVdom) => {
    let childrens = astVdom.children;
    for (let i = 0; i < childrens.length; i++) {
        let elem = childrens[i];
        if (elem.selected) {
            return elem
        } else if (Array.isArray(elem.children)) {
            return childrenHasSelect(elem)
        }
    }
};

/**
 * 
 * @param {*} astVdom 
 * @param {*} el 
 */
const removeChild = (astVdom, el = null) => {
    if (el) {
        astVdom.parent.el.removeChild(el);
    } else {
        astVdom.parent.el.removeChild(astVdom.el);
    }
}
// 更新 字符串 AST 到 DOM

// 修复替换元素出现的 BUG 调整中

// 粘帖功能调整

// AST 保存在内容中 每次更新ast