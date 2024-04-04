// import Data from "../../data.json"
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import { FaHeart } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { ajouter,addtofavori, changerpage } from "./../../app/features/CounterSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

// import { ajouter } from "./../../app/features/CounterSlice";

export default function Article() {
    const dispatch = useDispatch();
    const darkmode= useSelector((reducer) => reducer.counter.darkmode)

    const isconnected= useSelector((reducer) => reducer.counter.isconnected)


    const [data, setData] = useState(null)
    const [chargee, setChargee] = useState(false)
    useEffect(() => {
        fetch("https://example-data.draftbit.com/books")
        .then((response) => response.json())
        .then((response) => setData(response))
        .then(() => setChargee(true))
        .catch((error) => console.log(error))
    }, [])


    const[search,setSearh] = useState("")

    const[bookfilter,setBookfilter] = useState("All")
    // for the filter by select option
    function valuefiltre(e) {
        setBookfilter(e.target.value)
    }
    function canishow(element) {
        switch(bookfilter) {
            case "az":
                return true
            case "moins100 pages":
                return element.num_pages <= 100;
            case "500 pages":
                return element.num_pages >= 500;
            case "700 pages":
                return element.num_pages >= 700;
            case "1000 pages":
                return element.num_pages >=1000;
            case "plus4demi":
                return element.rating >= 4.5;
            case "plus4":
                return element.rating >= 4;
            case "plus3demi":
                return element.rating >= 3.5;
            case "plus3":
                return element.rating >= 3;
            
            // all book
            default:
                return true;
        }
    }



    // const [currentPageState, setcurrentPageState] = useState(1)
return ( <>
    <Navbar />

    <section className={darkmode ? "containerarticles darkbg" : "containerarticles"}>
        <div className='centerinput'>
            <input type="text" onChange={(e)=>{setSearh(e.target.value)}} className='inputsearch' placeholder="Recherchez un livre" />
        </div>

        <div className='endselect'>
            <select className='select mb50px' id='' onChange={valuefiltre} >
                <option value="All">Tout les livres</option>
                <option value="moins100 pages">-100 pages</option>
                <option value="500 pages">+500 pages</option>
                <option value="700 pages">+700 pages</option>
                <option value="1000 pages">+1000 pages</option>
                <option value="plus4demi">4.5* ou plus</option>
                <option value="plus4">4* ou plus</option>
                <option value="plus3demi">3,5* ou plus</option>
                <option value="plus3">3* ou plus</option>
                <option value="az">Alphabet A-Z</option>
            </select>
        </div>
        


        <div className='flexcard'>

    {chargee ? 
    data
        .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => bookfilter === "az" ? a.title.localeCompare(b.title) : 0)
        .map((book, index) => (           
        canishow(book) &&       
            <div key={index} className={darkmode ? "card pinkshadow" : "card greyshadow"}>
                <Link key={index} href={"/livres/"+book.id}>
                <img src={book.image_url} className="cardimg" alt={book.title} /></Link>
                <div className="infocard">
                    <p id='title' className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{book.title}</p>
                    <p  className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {book.rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>

                    <p  className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Pages : {book.num_pages} </p>

                    


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
        ))
    :
    <>
        <div className='divloading mt20px'>
            <div className='loading'></div>
            <p className='mt20px' id='loading'>Loading ...</p>
        </div>
    </>
    }


        </div>
   
    </section>
</>
);
}