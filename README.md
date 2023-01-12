# Daily Organizer

**Demo website:** [modokemdev.com/daily-organizer](https://modokemdev.com/daily-organizer/)  

This repository was built to deploy a **Daily Organizer App** to [GitHub Pages](https://pages.github.com/) using [gh-pages](https://www.npmjs.com/package/gh-pages). This app uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/) to display components. Routing determines which component to display.  

> This **README** focuses on deploying a [React](https://reactjs.org/) app to to [GitHub Pages](https://pages.github.com/). For more details on the project, take a look at my GitHub repository [express-react-app](https://github.com/marcoandre1/express-react-app).

To run this project locally, clone the project and run:  

```bash
# install node_modules
$ npm install

# run the project
$ npm run dev

# deploy to gh-pages (use git bash)
$ npm run deploy
```

## Table of Contents

- [Daily Organizer](#daily-organizer)
  - [Table of Contents](#table-of-contents)
  - [Setting up a new project](#setting-up-a-new-project)
  - [Deploy to GitHub pages](#deploy-to-github-pages)
    - [For more info, take a look at the following references](#for-more-info-take-a-look-at-the-following-references)
  - [Add Routing and Navigation in GitHub Pages](#add-routing-and-navigation-in-github-pages)
  - [Acknowledgements](#acknowledgements)

## Setting up a new project

> **NOTE:** the following steps allow you to set up a project from scratch. The output is very similar to what you would get with [Create React App](https://create-react-app.dev/docs/getting-started/). _The only difference is that you are going to understand the **magic** behind Create React App._  

```bash
# Generate package.json file
$ npm init --yes

# Install Webpack and related dependencies
$ npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin

# Install Babel and related dependencies
$ npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/preset-react @babel/register babel-loader

# Install React and related dependencies
$ npm install --save react react-dom react-redux

# Add .gitignore file
$ printf '%s\n' 'node_nodules' 'dist' > ./gitignore
```

> **NOTE:** for more info on `printf`, see [this answer](https://unix.stackexchange.com/a/191695) in Stack Exchange.  

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
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false
        })
    ],
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
        open: true
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader:'babel-loader'
        }]
    }
}
```

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

- Add an `index.html` file:  

> **NOTE:** You can manually add the `index.html` file to the `dist` folder at the root of the project but it is advised to setup [html-webpack-plugin](https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin). See the [getting started](https://webpack.js.org/guides/getting-started/#creating-a-bundle) tutorial from Webpack for more info.

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

- Add the following script to `package.json`:  

```json
{
  "scripts": {
    "dev": "webpack serve"
  },
}
```

- Run the application:  

```bash
# start webpack-dev-server
$ npm run dev
```

> Because we specify the `open: true` option in `webpack.config.js`, your browser should open automatically. If not, navigate to <http://localhost:8080/>. You should see `Daily Organizer` displayed on the top left of the screen.  

## Deploy to GitHub pages

This web application is ready for deployment using [gh-pages](https://www.npmjs.com/package/gh-pages). Simply run the following command in `git bash`: `npm run deploy`.

For this to work, you previously need to install **gh-pages** (`npm install gh-pages --save-dev`) and update the `package.json` scripts:

```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "deploy": "npm run build && gh-pages -d build"
  }
}
```

You will also need to update `webpack.config.js` and `index.html`.  

- Install [HtmlWebpackPlugin](https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin) (`npm install --save-dev html-webpack-plugin`) and adjust the `webpack.config.js` file.  
- Install [clean-webpack-plugin](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder) (`npm install --save-dev clean-webpack-plugin`) and configure it.  

Finally, because we are deploying to `https://<USERNAME>.github.io/<REPO>`, you will need to add a `webpack.prod.js` file at the root of the project. This is the easiest way I found to tell **Webpack** to prefix the `/bundle.js` path in `index.html` with the `repo`.

### For more info, take a look at the following references

1. [Inserting variables into HTML and JavaScript with Webpack](https://medium.com/dailyjs/inserting-variables-into-html-and-javascript-with-webpack-80f33625edc6) - This explains why we add a `<%= htmlWebpackPlugin.options.repo %>` to `index.html`.  
2. [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) - Check the **Options** and the **Writing Your Own Templates**. It helps to understand the plugin use cases.  
3. [Webpack Configuration](https://webpack.js.org/configuration/).  
4. [Webpack Output Management](https://webpack.js.org/guides/output-management/).  
5. [Webpack HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/).  
6. [Webpack Development](https://webpack.js.org/guides/development/).  
7. [Webpack Production](https://webpack.js.org/guides/production/).  

## Add Routing and Navigation in GitHub Pages

> **NOTE:** take a close look at the `REPO` variable in the code below. The `REPO` variable is **necessary** because we are deploying to `https://<USERNAME>.github.io/<REPO>`. For this to work, we need to add the [publicPath](https://webpack.js.org/guides/public-path/) configuration option and the [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) variable `REPO` in `webpack.config.js` and `webpack.prod.js`. **Be sure to take a look at those files!**.

- Add **react-router-dom**: `npm install react-router-dom --save`.  
- Add a new `Navigation` component at `src/app/components/Navigation.jsx`:

```jsx
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => (
    <div className="header">
        <Link to={`${REPO}/dashboard`}>
            <h1>
                Daily Organizer
            </h1>
        </Link>
    </div>
);

export const ConnectedNavigation = connect(state=>state)(Navigation);
```

- Update `Main.jsx` to import the `Navigation` component and `BrowserRouter` and `Route` from `react-router-dom`:

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { BrowserRouter, Route, } from 'react-router-dom';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail} from './TaskDetail';

const Main = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="container mt-3">
                    <ConnectedNavigation/>
                    <Route
                        exact
                        path={`${REPO}/dashboard`}
                        render={ () => (<ConnectedDashboard/>)}
                    />
                    <Route
                        exact
                        path={`${REPO}/task/:id`}
                        render={ ({ match }) => (<ConnectedTaskDetail match={ match }/>)}
                    />
                </div>
            </Provider>
        </BrowserRouter>
    );
};

export default Main;
```

## Acknowledgements

For more info, take a look at my original repo: [express-react-app](https://github.com/marcoandre1/express-react-app).  
