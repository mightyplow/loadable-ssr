module.exports = function loadableMock (fn = Function.prototype) {
    const result = fn();
    return result && result.default
        ? result.default
        : result;
};