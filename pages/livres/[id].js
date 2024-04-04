import { useRouter } from 'next/router';
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { ajouter, addtofavori } from "./../../app/features/CounterSlice"
import { useDispatch, useSelector } from 'react-redux';

import { AiFillStar } from "react-icons/ai";

import Navbar from '../../components/Navbar/Navbar';
import Link from 'next/link';
export default function ArticlePage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [chargee, setChargee] = useState(false);
  const dispatch = useDispatch();
  const darkmode= useSelector((reducer) => reducer.counter.darkmode)
  const isconnected= useSelector((reducer) => reducer.counter.isconnected)
  
  useEffect(() => {
    fetch("https://example-data.draftbit.com/books")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setChargee(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const { id } = router.query;

  const book = data.find((book) => book.id.toString() === id);

  if (!book) {
    return(<>
            <Navbar />  
            <section className={darkmode ? "containerarticles darkbg centerflex" : "containerarticles centerflex"}>
                <div className='divloading mt20px'>
                    <div className='loading'></div>
                    <p className={darkmode ? "mt20px pwhite" : "pblack"} id='loading'>Article not found ...</p>
                </div>;
            </section>
    </>)
  }

return (<>
    <Navbar />
    <section className={darkmode ? "containerarticles darkbg centerflex" : "containerarticles centerflex"}>

        {chargee  ?  <>
        <div className='divcontainerdetailarticle'>
            <div><img src={book.image_url} alt="" className='imgbookdetail' /></div>
            <div className='rightinfodetails'>
                <h1 className={darkmode ? "pwhite mb20px" : "pblack mb20px"} >{book.title}</h1>
                <p  className={darkmode ? " pwhite mb20px" : " pblack mb20px"}>Pages : {book.num_pages}</p>
                <p  className={darkmode ? " pwhite mb20px" : " pblack mb20px"}>Notes : {book.rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                <p className={darkmode ? "pwhite mb20px" : "pblack mb20px"}>Authors: {book.authors}</p>
                <p className={darkmode ? "pwhite mb20px" : "pblack mb20px"} id='plast'>Description: {book.description}</p>
                {isconnected == false  ? 
                    <Link href="/connexion/">
                        <p id='link' className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>Connectez-vous pour ajouter au panier ou aux favoris</p>
                    </Link>
                    : <>
                    <button className='addtocart'
                    onClick={  ()=>{dispatch(ajouter({
                        id: book.id, 
                        img: book.image_url,
                        title: book.title,
                        }) 
                    )}}
                     >Ajouter au panier</button>
                    <button className='heart addtocart' onClick={  ()=>{dispatch(addtofavori({
                        id: book.id, 
                        img: book.image_url,
                        title: book.title,
                        }) 
                    )}} ><FaHeart /></button></>
                    }
            </div>
        </div>

        </>
        : <>

        <div className='divloading mt20px'>
            <div className='loading'></div>
            <p className={darkmode ? "mt20px pwhite" : "pblack"} id='loading'>Loading ...</p>
        </div>
        </>
         }

  

      
    </section>
</>);
}


