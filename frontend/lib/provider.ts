import { HocuspocusProviderWebsocket } from "@hocuspocus/provider";

const websocketProvider = new HocuspocusProviderWebsocket({
    url: 'ws://localhost:1234',
});

websocketProvider.on('disconnect', () => {
    console.log('Reconnecting websocket provider', websocketProvider.status);
    if (websocketProvider.status==='disconnected') {
        websocketProvider.connect();
    }
});

export default websocketProvider;