exports.bigIntHandler = function (result) {
    return JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}