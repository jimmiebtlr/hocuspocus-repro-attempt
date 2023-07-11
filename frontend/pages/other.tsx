import Link from 'next/link';
import provider from '../lib/provider'

export default function Other() {
    return <>
    <button onClick={() => console.log(provider)}>hello world</button>
    <br/>
    <Link href="/">Nav</Link>
    </>
};