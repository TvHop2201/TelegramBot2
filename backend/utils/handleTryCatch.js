class TryCatch {
    handle(promise) {
        return promise
            .then(data => [undefined, data])
            .catch(err => [err, undefined])
    }
}

module.exports = new TryCatch()