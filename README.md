## Part 1

Understanding of webpack. Webpack is used to bundle multiple modules into single file. For example if we use modules like react, faker, webpack will bundle these into single file called main.js

```
"html-webpack-plugin": "^5.5.3",
"webpack": "^5.88.2",
"webpack-cli": "^5.1.4",
"webpack-dev-server": "^4.15.1"
```

webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
 devServer: {
   port: 8080
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
};
```

## Part 2

We have implemented Module Federation. This is the new feature in Webpack 5

1. Expose the file as Microfrontend.

```
new ModuleFederationPlugin({
      name:"products",
      filename:"remoteEntry.js",
      exposes:{
        './ProductsIndex':'./src/index'
      }
    }),
```

2. Import the microfrontend in container

```
new ModuleFederationPlugin({
      name:"container",
      remotes:{
        products:"products@http://localhost:8081/remoteEntry.js"
      }
    }),
```

3. Make sure that markup should not have id similar to remote MF name. for example id="products"

## Part 3

We can share dependencies in Module federation. for example faker is being used by both 
cart and products project.

webpack.config.js

```
new ModuleFederationPlugin({
      name:"cart",
      filename:"remoteEntry.js",
      exposes:{
        './CartShow':'./src/index'
      },
      shared:["faker"]
    }),
```

#### Problem 1
The above change break cart and products although it will work in container

The solution is webpack should async load the bootstrap file.

#### Problem 2
Dependency version
Webpack will load module if shared module have different major version

If we want to prevent restrict multiple loading of different version of modules

```
{
  shared:{
    faker: {
      singleton:true
    }
  }
}
```

#### Problem 3
Major Requirement is we should be able to develop each MF in isolation

We are making assumption that <div id="cart-dev"></div> will be there in both cart and container html, which is kind of wrong.