import { Server, Extension } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';

const db = {};
 
const createServer = () => {
  return Server.configure({
    port: 1234,

    debounce: 1000,
    maxDebounce: 5000,
    timeout: 3000,

    extensions: [new Database({
      store: async ({ documentName, state }) => {
        await new Promise(r => setTimeout(r,500));
        db[documentName] = state;
      },
  
      fetch: async ({ documentName }) => {
        await new Promise(r => setTimeout(r,500));
        return db[documentName];
      },
    })],

    async onAuthenticate({ token, documentName, connection, ...other }) {
      console.log("Token", token);
      return {  };
    },
  });
};


function main() {
  const server = createServer();

  server.listen();
}

main();
