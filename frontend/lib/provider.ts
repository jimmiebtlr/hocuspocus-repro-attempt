import { HocuspocusProviderWebsocket } from "@hocuspocus/provider";

const websocketProvider = new HocuspocusProviderWebsocket({
    url: 'ws://localhost:1234',
});

// This causes other problems
// websocketProvider.on('disconnect', () => {
//     console.log('Reconnecting websocket provider', websocketProvider.status);
//     if (first && websocketProvider.status==='disconnected') {
//         websocketProvider.connect();
//         first = false;
//     }
// });

export default websocketProvider;