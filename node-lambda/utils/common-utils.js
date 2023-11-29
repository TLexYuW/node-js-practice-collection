/**
 * 
 * @param {*} result
 * @return {String | *}
 */
function bigIntHandler(result) {
    const value = JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
    return value;
}

module.exports = {
    bigIntHandler
}