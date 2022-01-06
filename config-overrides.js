const { alias, configPaths, aliasJest } = require("react-app-rewire-alias"); // DO NOT CONVERT TO ES6 MODULE STYLE!

const aliasMap = configPaths('./jsconfig.paths.json')

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);
