import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from "react";

import Link from 'next/link';

import { addone, removeproduct, removeonequantity, buynow } from "./../app/features/CounterSlice"
import Navbar from '../components/Navbar/Navbar';
import { useState } from 'react';
export default function Panier() {
    const dispatch = useDispatch();
    const isconnected= useSelector((reducer) => reducer.counter.isconnected)
    const panier= useSelector((reducer) => reducer.counter.panier)
    const[payee,setPayee] = useState(false)

    const darkmode= useSelector((reducer) => reducer.counter.darkmode)


    
return(<>
    <Navbar />
    
    {isconnected== false &&  <>
        <section className={darkmode ? "spanier containerarticles darkbg" : "spanier containerarticles"}>
        <div className='flexcolumn transitiontopbottom'>
            <Link href="/connexion/">
                <div className='yourcart iwant'>Connectez-vous ou créez un compte pour utiliser votre panier !</div>
            </Link>
        </div>
        </section>

    </>}

    {panier.length == 0 && payee==false && isconnected== true && <>


        <section className={darkmode ? "spanier containerarticles darkbg" : "spanier containerarticles"}>
        <div className='flexcolumn transitiontopbottom'>
            <div className='yourcart'>Votre panier est vide !</div>
        </div>
        </section>
    </> }


    {panier.length >= 1 && isconnected== true &&  payee==false &&

        <>
    <section className={darkmode ? "spanier containerarticles darkbg" : "spanier containerarticles"}>

        <div className='flexcolumn transitiontopbottom'>
            <div className='yourcart'>Your Cart({panier.length})</div>

            {panier.map((book,index) => (
                <div className='dflexrow product' key={index}>
                    <img src={book.img} alt="" className='imgproduct' />
                    <div>
                        <p>{book.title}</p>
                        <p className='mb15px'>Quantity : {book.quantity}</p>
                        <button onClick={()=>{dispatch(addone(index)) }} className='addtocart2 mr20px' >+1</button>
                        <button onClick={()=>{dispatch(removeonequantity(index))}} className='addtocart2 mr20px'>-1</button>
                        <button onClick={()=>{dispatch(removeproduct(index))}} className='addtocart2 mr20px'>Delete</button>
                    </div>
                </div>
            ))}

        </div>

        
            <div className={darkmode ? "summary bgwhitepanier transitionlefttoright" : "summary  bgblack transitionlefttoright"}>
                <p className={darkmode ? "textaligncenter ipay pwhite" : "textaligncenter ipay pwhite"} >Total</p>
                <div className='centerbtn'>
                    <button className='btnpaynow addtocart2' onClick={()=>{ dispatch(buynow()),  setPayee(true)}}>Buy Now</button>
                </div>
                

            </div>
        </section>
            </>
        }
        

        {panier.length == 0 && payee==true &&  isconnected== true && <>
        <section className={darkmode ? "spanier containerarticles darkbg" : "spanier containerarticles"}>

        <div className='flexcolumn transitiontopbottom'>
            <div className='yourcart'>Thanks you for your order !</div>
        </div>
        </section>

        </> }
    


        

</>)
}