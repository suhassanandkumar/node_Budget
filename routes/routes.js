// import other routes
const userRoutes = require('./users');
//const dataRoutes = require('/data');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    //dataRoutes(app, fs);

    // // other routes
    userRoutes(app, fs);

};

module.exports = appRouter;