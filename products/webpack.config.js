const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
 devServer: {
   port: 8081
 },
  plugins: [
    new ModuleFederationPlugin({
      name:"products",
      filename:"remoteEntry.js",
      exposes:{
        './ProductsIndex':'./src/bootstrap'
      },
      shared:["@faker-js/faker"]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
};