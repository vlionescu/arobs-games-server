const http = require('http');
const app = require('./app');
const db = require('./database/index');

const port = app.get('PORT');

db.init().then(() => {
  db.inserts().then(() => {
    http.createServer(app).listen(process.env.PORT || port, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Could not start the server on', port);
      } else {
        // eslint-disable-next-line no-console
        console.log('Server is up and running on', port);
      }
    });
  });
});
