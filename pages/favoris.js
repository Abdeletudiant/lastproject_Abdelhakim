import { useDispatch, useSelector } from 'react-redux';
import {removefavoris  } from "../app/features/CounterSlice"
import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';
export default function Favori() {
    const dispatch = useDispatch();
    const favoris= useSelector((reducer) => reducer.counter.favoris)
    const isconnected= useSelector((reducer) => reducer.counter.isconnected)

    const darkmode= useSelector((reducer) => reducer.counter.darkmode)

    // spanier containerarticles darkbg 
return(<>
    <Navbar />
    <section className={darkmode ? "spanier containerarticles darkbg" : "spanier containerarticles"}>
        {/* pas connecté */}
        {isconnected== false ?
            <div className='flexcolumn'>
                <Link href="/connexion/">
                    <div className='yourcart iwant'>
                        Connectez-vous ou créez un compte pour voir vos favoris !
                    </div>
                </Link>
            </div>
    : <>
        {/* connecté */}
    <div className='flexcolumn'>

            {favoris.length ==0 ? 
                <div className='flexcolumn'>
                    <div className='yourcart '>Votre liste de favoris est vide</div>
                </div>
            : <>

            {favoris.map((book,index) => (
            <div className='dflexrow product' key={index}>
                <img src={book.img} alt="" className='imgproduct' />
                <div>
                    <p>{book.title}</p>
                    <button className='addtocart mt20px' onClick={()=>{dispatch(removefavoris(index))}}>Delete from favoris</button>
                </div>
            </div>))}

            </>}

        



    </div></>
    }
    
        
    </section>
</>)
}