module.exports = function(bundler) {
  bundler.addAssetType('ejs', require.resolve('./src/EJSAsset.js'));
};
