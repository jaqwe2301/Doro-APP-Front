const { getDefaultConfig } = require("@expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

// SVG transformer configuration
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Resolver configuration
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts
    .filter((ext) => ext !== "svg")
    .concat("cjs"),
  sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
};

module.exports = defaultConfig;
