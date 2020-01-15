
const userRoutes = (app, fs) => {

    // variables
    var dataPath = '';
    const dataPath1 = './data/transact.json';
    const datapath = './data/mydata.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ ---- mydata.json
    app.get('/users', (req, res) => {
        dataPath = datapath;
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // READ ---- users.json
    app.get('/data', (req, res) => {
        dataPath = dataPath1;
        fs.readFile(dataPath1, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE User
    app.post('/users', (req, res) => {
        dataPath = datapath;

        readFile(data => {
            //const newUserId = Object.keys(data).length + 1;
            const newUserId = req.body.id;
            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('New User Added');
            });
        },
            true);
    });

    // Add New description
    app.post('/data', (req, res) => {
        dataPath = dataPath1;

        readFile(data => {
            //const newUserId = Object.keys(data).length + 1;
            const userId = req.body.userId;
            const tId = req.body.id;
            var des = {description : req.body.description, amount: req.body.amount};
            // add the new user
            data[userId.toString()][tId.toString()] = des;
            //data[newUserId.toString()] = req.body;

            

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('New Receipt been Added');
            });
        },
            true);
    });



    // UPDATE
    app.put('/users/:id', (req, res) => {
        dataPath = datapath;

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`user ID : ${userId} Updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {
        dataPath = datapath;

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`user ID : ${userId} Removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;