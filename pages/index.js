import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import Carrousel from '../components/Carrousel';
import { useDispatch, useSelector } from 'react-redux';
export default function Home() {
    const dispatch = useDispatch();
    const darkmode= useSelector((reducer) => reducer.counter.darkmode)
return (<>
    <Navbar />
    <section className={darkmode ? "containerarticles darkbg sectioncarrousel" : "containerarticles sectioncarrousel"}>
    <Carrousel />

    

    </section>
    

</>);
}
