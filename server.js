const app = require('./src/app');
const PORT = process.env.APP_PORT || 3055;


const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

// process.on('SIGINT', () => {
//   server.close(() => console.log('Exit server express'));
// })