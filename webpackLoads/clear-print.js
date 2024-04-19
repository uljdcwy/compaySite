module.exports = function(/** @type {string} */ source){
    source = source.replace(/console.log\([^)]+[\)];?/,'')
    return source;
}