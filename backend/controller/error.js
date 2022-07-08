exports.error = (err, message) => {
    return `"${err}" : "${message}"`
};
exports.authErr = (err, message) => {
    return `${err} : ${message}`
}