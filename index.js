module.exports = function(bundler) {
  bundler.addAssetType('ejs', require.resolve('./EJSAsset.js'));
};
