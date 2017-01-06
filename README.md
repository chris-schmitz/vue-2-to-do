# vue-todo-client

> A todo crud js client

![demo](readmeAttachments/demo.gif)

This client was built for a meetup group demo, so it's not fool proof and is best viewed in chrome (of course ;) ). If you have any questions about this project or [the companion vue-2-to-do-node-server project](https://github.com/chris-schmitz/vue-2-to-do-node-server) ping me [@cschmitz81](https://twitter.com/cschmitz81) on twitter.

## Wireframe

This UI is based on [the wireframes found here](https://drive.google.com/file/d/0Bxhfk2Nciu7jT250ZzRBbTRaLW8/view?usp=sharing). 
Note that you need google drive to view this document. 


## Get up and running

1. Open a terminal
2. `cd` to a directory where you want to store the project
3. Clone the project
```
git clone https://github.com/chris-schmitz/vue-2-to-do.git
```


## Using this with an API

This client is meant to work with a separte API. An example of this is the [vue-2-to-do-node-server](https://github.com/chris-schmitz/vue-2-to-do-node-server) API repository. 


### Building an API that works with this client

This client hits the following routes:

- GET /tasks
- POST /tasks
- PATCH /tasks/{id}
- DELETE /tasks/{id}

Tasks are made up of the following properties:

- complete: Boolean,
- description: String,
- title: String,
- history: Array
    - Note that while history exists it's not being used for anything at the moment.

e.g.:

```
{
    complete: true,
    description: "Give an example of a task.",
    title: "Show a test task",
    history: []
}
```

Request data will be sent as json objects.

Responses are also expected as json in the following shape:


```
{
    "success": true,
    "status": 200,
    "message": "Records retrieved.",
    "payload":[
        {
            "id": 12345,
            "title": "Walk the dog",
            "description": "Put on your shoes, put the dog on a leash, and walk it!",
            "complete": false
        }
    ]
}
```

To make it simple to use this with an external API the base host name used for all ajax calls has been moved out to a config file (see the ["for API Developers](#for-api-developers) section below for more info) and all of the ajax calls are made from the `src/components/Store.js` file so you shouldn't need to hunt around too much to see how the calls are made. 

### For API Developers

This front end is configured to communicate with a separate API at a specific host address.

To set the host address for your version of the api do the following:

1. Make a copy of the `config.example.js` file at the root of this project and rename it `config.js`
2. In `config.js` set the `api.host` property to the fully qualified address that your api is hosted at.
    e.g. 

```
module.exports = {
    api: {
        host: 'http://localhost:8082'
    }
}
```
3. Start the dev server

```
npm run dev
```

Once you do this, all of the calls to your api will use the host you define for the base url.

**NOTE that the host address includes `http://` does _not_ include the trailing forwardslash**.

Also note that you could just run `npm run build` and use the `index.html` file found at the root of the project and the `dist/build.js` file on whatever web server you want, but the webpack-dev-server that the `npm run dev` script spins up is good enough for our project.

Also also note that if you host your API on a different domain from this clinet you'll want to make sure your API and/or web server has CORS enabled. 

### For client developers


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
