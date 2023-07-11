import React, { useEffect, useState, useRef, useMemo } from 'react';
import * as Y from 'yjs';
import '@hocuspocus/common';
import {
  HocuspocusProvider,
  HocuspocusProviderWebsocket,
} from '@hocuspocus/provider';
import { EditorContent, useEditor, AnyExtension } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';

const websocketProvider = new HocuspocusProviderWebsocket({
  url: 'ws://localhost:1234',
});

websocketProvider.on('disconnect', () => {
  console.log('Reconnecting websocket provider', websocketProvider);
  //   websocketProvider.connect();
});

// No impact
// const getToken = async () => {
//     await new Promise((r) => setTimeout(r, 100));
//     return '1234';
// };

const TextEditor: React.FC<{name: string}> = ({ name }) => {
  const ydoc = useMemo(() => new Y.Doc(),[]);
  const provider = useMemo(() => new HocuspocusProvider({
    name,
    websocketProvider,
    document: ydoc,

    token: '1234', // getToken,
  }),[name]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({history: false}),
      Collaboration.configure({
        document: ydoc,
      })
    ],
  });

  return <EditorContent editor={editor} style={{outline: "1px solid black", margin: '10px'}}/>;
};

export default function Home() {
  const keys = Array.from(Array(100).keys());

  return (
    <>
      {keys.map((k) => <TextEditor name={k.toString()} key={k}/>)}
    </>
  )
}
