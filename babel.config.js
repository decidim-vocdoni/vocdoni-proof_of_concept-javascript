module.exports = {
  presets: [['@babel/preset-env', {
    targets: { node: "current" },
    forceAllTransforms: true,
    useBuiltIns: "entry",
    corejs: 3
  }]],
};
