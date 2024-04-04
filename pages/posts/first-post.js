import { useState } from 'react';
import Link from 'next/link';
import styles from "../../styles/firstpost.module.css"
import Navbar from '../../components/Navbar/Navbar';
export default function FirstPost() {
    const [user, setUser] = useState("Abdel");
    function name() {
        setUser("nouveaunom");
    }
  return ( <>
    <Navbar />
        <h1 className='text-align-center'>{user}, Vous êtes sur la page du first-post</h1>
        <button onClick={name}>Changer le nom</button>
        <h1><Link href="/">Back to home</Link></h1>
</>
);
}