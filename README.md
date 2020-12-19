# Daily Organizer

This repository was built to deploy a **Daily Organizer App** to [GitHub Pages](https://pages.github.com/) using [gh-pages](https://www.npmjs.com/package/gh-pages). This app uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/) to display components. Routing determines which component to display. If you want to add a database, take a look at my GitHub repository [express-react-app](https://github.com/marcoandre1/express-react-app).

> To run this project locally, clone the project and run `npm run dev`.  
> To deploy, use `git bash` and run `npm run deploy`.

## Index

1. [Setting up a new project](https://github.com/marcoandre1/daily-organizer#setting-up-a-new-project)  
2. [Create default application state as JSON file for development](https://github.com/marcoandre1/daily-organizer#create-default-application-state-as-JSON-file-for-development)  
3. [Create Redux store](https://github.com/marcoandre1/daily-organizer#create-redux-store)  
4. [Connect a Dashboard component to the Redux store](https://github.com/marcoandre1/daily-organizer#connect-a-dashboard-component-to-the-redux-store)  
5. [Deploy to GitHub pages](https://github.com/marcoandre1/daily-organizer#deploy-to-github-pages)  

## Setting up a new project

> **NOTE:** the following steps allow you to set up a project from scratch. The output is very similar to what you would get with [Create React App](https://create-react-app.dev/docs/getting-started/). _The only difference is that you are going to understand the **magic** behind Create React App._  

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

- Add the following script to `package.json`:  

```json
{
  "scripts": {
    "dev": "webpack serve"
  },
}
```

> **NOTE:** As of [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), the script command is not anymore `webpack-dev-server` but `webpack serve`. For more info, see: [webpack-dev-server](https://github.com/webpack/webpack-dev-server#webpack-dev-server) and [DevServer](https://webpack.js.org/configuration/dev-server/).  

- Run the application: `npm run dev`.  

> Because we specify the `open: true` option in `webpack.config.js`, your browser should open automatically. If does not open it and navigate to <http://localhost:8080/>. You should see `Daily Organizer` displayed on the top left of the screen.  

## Create default application state as JSON file for development

- Add `src/server/defaultState.js` file:

```js
export const defaultState = {
    users:[{
        id:"U1",
        name:"Dev"
    },{
        id:"U2",
        name:"C. Eeyo"
    }],
    groups:[{
        name:"To Do",
        id:"G1",
        owner:"U1"
    },{
        name:"Doing",
        id:"G2",
        owner:"U1"
    },{
        name:"Done",
        id:"G3",
        owner:"U1"
    }
    ],
    tasks:[{
        name:"Refactor tests",
        id:"T1",
        group:"G1",
        owner:"U1",
        isComplete:false,
    },{
        name:"Meet with CTO",
        id:"T2",
        group:"G1",
        owner:"U1",
        isComplete:true,
    },{
        name:"Compile ES6",
        id:"T3",
        group:"G2",
        owner:"U2",
        isComplete:false,
    },{
        name:"Update component snapshots",
        id:"T4",
        group:"G2",
        owner:"U1",
        isComplete:true,
    },{
        name:"Production optimizations",
        id:"T5",
        group:"G3",
        owner:"U1",
        isComplete:false,
    }],
    comments:[{
        owner:"U1",
        id:"C1",
        task:"T1",
        content:"Great work!"
    }]
};
```

## Create Redux store

- Install Redux: `npm install --save redux`.
- Create **Redux store** at `src/app/store/index.jsx`:

```jsx
import { createStore } from 'redux';
import { defaultState } from '../../server/defaultState';

export const store = createStore(
    function reducer (state = defaultState, action) {
        return state;
    }
);
```

## Connect a Dashboard component to the Redux store

- Add the `Dashboard` component at `src/app/components/Dashboard.jsx`:  

```jsx
/**
 * The dashboard is a simple React component that contains several lists of tasks,
 * one for each group that belongs to the user.
 */

import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({groups}) => (
    <div>
        <h2>Dashboard</h2>
        {groups.map(group=>(
            <ConnectedTaskList key={group.id} id={group.id} name={group.name}/>
        ))}
    </div>
);

function mapStateToProps(state) {
    return {
        groups:state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
```

- Add the `TaskList` component at `src/app/components/TaskList.jsx`:  

```jsx
import React from 'react';
import { connect } from 'react-redux';

export const TaskList = ({tasks, name}) => (
    <div className="card p-2 m-2">
        <h3>
            {name}
        </h3>
        <div>
            {tasks.map(task=>(
                <div key={task.id}>{task.name}</div>
            ))}
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let groupID = ownProps.id;
    return {
        name: ownProps.name,
        id: groupID,
        tasks: state.tasks.filter(task=>task.group === groupID)
    };
};

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
```

- Update `Main` component to include the **Redux store** and the `Dashboard` component:

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from "./Dashboard";

const Main = () => {
    return (
        <Provider store={store}>
            <div className="container mt-3">
                <ConnectedDashboard/>
            </div>
        </Provider>
    );
};

export default Main;
```

> Now, if you run: `npm run dev`, you should see the _default tasks_ loaded to your browser.

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
