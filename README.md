# Daily Organizer

This repository was built to deploy a **Daily Organizer App** to [GitHub Pages]() using [gh-pages](). This app uses React and Redux to display components. Routing determines which component to display. Express allows to communicate with MongoDB through REST API. If you want to add a database, take a look at my GitHub repository [express-react-app](https://github.com/marcoandre1/express-react-app).

> To run this project locally, clone the project and run `npm run dev`.
> To deploy, use `git bash` and run `npm run deploy`.

## Index

1. [Setting up a new project]()

- Create a `package.json` file: `npm init --yes`.  
- Install `Webpack`: `npm install --save-dev webpack`.  
- Add `.gitignore` file and add `node_modules` and `dist` to it.  
- Install other dependencies:  

```console
npm install --save-dev webpack-cli webpack-dev-server
npm install --save-dev @babel/core
npm install --save-dev @babel/node @babel/preset-env @babel/preset-react @babel/register
npm install --save-dev babel-loader
```

- Add a `.babelrc` file:  

```json
{
  "presets": [
    ["@babel/preset-env",{
      "targets":{
        "node":"current"
      }
    }],
    "@babel/preset-react"
  ]
}
```

- Add a `webpack.config.js` file:  

```javascript
const path = require("path");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src','app'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        host: 'localhost',
        open: true,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader:'babel-loader'
        }]
    }
}
```

> **NOTE:** As of [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), we need to specify `port`, `host`, `open`, `publicPath` options in `devServer` configuration. For more info, see: [error: option '--open <value>' argument missing](https://github.com/webpack/webpack-cli/issues/2001) and [webpack output is served from undefined](https://github.com/webpack/webpack-dev-server/issues/2745).  

- Install **React**: `npm install --save react react-dom react-redux`.
- Add a simple `Main.jsx` component at `src/app/components/Main.jsx`:

```jsx
import React from 'react';

const Main = () => {
    return <div>Daily Organizer</div>;
};

export default Main;
```

- Add the `index.jsx` entry file at `src/app/index.jsx`:  

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
```

- Add `index.html` to the root of the project:  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Daily Organizer</title>
</head>
<body class="container">
    <div id="app"></div>
    <script src="/bundle.js"></script>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>
```

> **NOTE:** We use [BootstrapCDN](https://getbootstrap.com/docs/4.4/getting-started/introduction/) for this project.

- Add the following scripts to `package.json`:  

```json
{
  "scripts": {
    "start": "webpack",
    "dev": "webpack serve"
  },
}
```

> **NOTE:** As of [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), the script command is not anymore `webpack-dev-server` but `webpack serve`. For more info, see: [webpack-dev-server](https://github.com/webpack/webpack-dev-server#webpack-dev-server) and [DevServer](https://webpack.js.org/configuration/dev-server/).  

- Run the application: `npm run dev`.  
