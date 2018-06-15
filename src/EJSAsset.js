const path = require("path");
const Asset = require("parcel-bundler/lib/Asset");
const localRequire = require("parcel-bundler/lib/utils/localRequire");

class EJSAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = "html";
  }

  async generate() {
    const ejs = await localRequire("ejs", this.name);
    const config = (await this.getConfig([".ejsrc", ".ejsrc.js", "ejs.config.js"])) || {};

    const compiled = ejs.compile(this.contents, {
      compileDebug: false,
      filename: this.name,
      _with: false,
      escape: config.escape,
      rmWhitespace: config.rmWhitespace,
    });

    if (compiled.dependencies) {
      for (let item of compiled.dependencies) {
        this.addDependency(item, {
          includedInParent: true,
        });
      }
    }

    return compiled();
  }
}

module.exports = EJSAsset;
