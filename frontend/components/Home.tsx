import React, {useMemo} from 'react';
import * as Y from 'yjs';
import '@hocuspocus/common';
import {HocuspocusProvider, WebSocketStatus,} from '@hocuspocus/provider';
import {EditorContent, useEditor} from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import websocketProvider from '../lib/provider'
import Link from 'next/link';

// No impact
// const getToken = async () => {
//     await new Promise((r) => setTimeout(r, 100));
//     return '1234';
// };

const TextEditor: React.FC<{name: string}> = ({ name }) => {
  const ydoc = useMemo(() => new Y.Doc(),[]);
  const provider = useMemo(() => {

    if( websocketProvider.status === WebSocketStatus.Disconnected ) {
      websocketProvider.connect()
    }

    return new HocuspocusProvider({
      name,
      websocketProvider,
      document: ydoc,

      token: '1234', // getToken,
    })
  },[name,ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({history: false}),
      Collaboration.configure({
        document: ydoc,
      })
    ],
  });

//   if (websocketProvider.status==='disconnected') {
//     websocketProvider.connect();
//   }

  return <EditorContent editor={editor} style={{outline: "1px solid black", margin: '10px'}}/>;
};

export default function Home() {
  const keys = Array.from(Array(100).keys());

  return (
    <>
      <Link href="/other">Other Page</Link>
      {keys.map((k) => <TextEditor name={k.toString()} key={k}/>)}
    </>
  )
}
