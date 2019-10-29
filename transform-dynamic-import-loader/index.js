module.exports = function transformDynamicImportLoader (resource) {
    return /\.(js|jsx|ts|tsx)$/.test(this.resourcePath)
        ? resource.replace(/import[\s\n]*?[(]/g, 'require(')
        : resource
};