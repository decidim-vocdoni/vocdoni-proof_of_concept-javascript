const path = require("path");

module.exports = {
  entry: {
    vocdoni_admin_bundle: "./src/entrypoints/vocdoni_admin.js",
    vocdoni_voter_bundle: "./src/entrypoints/vocdoni_voter.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/js/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  watch: true
};

