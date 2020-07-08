import http from 'http';
import { app } from './api/app';
import cluster from 'cluster';

// if (cluster.isMaster) {
//   // Fetch Number of Workers
//   // const numWorkers = require('os').cpus().length;
//   const numWorkers = 1

//   console.log('Master cluster setting up ' + numWorkers + ' workers...');

//   // Fork the process and make clusters
//   for (let i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }

//   // Cluster Method for Online
//   cluster.on('online', function (worker) {
//     console.log('Worker ' + worker.process.pid + ' is online');
//   });

//   // Cluster Method for Exit
//   cluster.on('exit', function (worker, code, signal) {
//     console.log(
//       'Worker ' +
//         worker.process.pid +
//         ' died with code: ' +
//         code +
//         ', and signal: ' +
//         signal
//     );
//     console.log('Starting a new worker');
//     cluster.fork();
//   });
// } else {
  // Define Application port
  const port = process.env.PORT || 3000;

  // Defining the Host Name
  const host: any = process.env.HOST || '0.0.0.0';

  // Environment State Variable
  const env = process.env.NODE_ENV;

  // Creating the server
  const server = http.createServer(app);

  // Exposing the server to the desired port
  server.listen(port, host, () => {
    console.log(`
    
  ⚙️  Jagrik server running at: \n\t http://localhost:${port}
  
  🌏 Environment: \n\t ${env}
  `);
  });
// }
