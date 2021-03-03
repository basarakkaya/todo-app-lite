# todo-app-lite

One-list todo app.

[Demo URL](https://todo-app-lite.herokuapp.com/)

## before starting

This app connects to MongoDB. You need to define an environment variable named `MONGO_URI` in order your app to connect to a DB that contains To-do items. If you do not set the environment variable, the app cannot connect to a MongoDB than it will throw an error.

After that, the dependecies are need to be downloaded. Run `npm install` in the root directory and `yarn` in the `/client` directory. When the dependencies are installed, the app is ready to be started.

## starting the app

To run the app in development mode, run `npm run dev` in the root directory. It will concurrently run start scripts of both server and client.

To run the app in production mode, first you need to have a production build of the client. To have it, run `yarn build` in `/client` directory. After that, run `npm start` in the root directory.
