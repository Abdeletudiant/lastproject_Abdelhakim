import Link from "next/link"
import Image from 'next/image'

// import Burger from "./burger.png"
import { GrLogin } from "react-icons/gr";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { changetheme } from "./../../app/features/CounterSlice";
import { BsCart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { disconnect } from "./../../app/features/CounterSlice";
import { useState } from "react";
export default function Navbar() {

    const dispatch = useDispatch();
    const isconnected= useSelector((reducer) => reducer.counter.isconnected)
    const darkmode= useSelector((reducer) => reducer.counter.darkmode)
    const panier= useSelector((reducer) => reducer.counter.panier)
    const favoris= useSelector((reducer) => reducer.counter.favoris)
    const[showdropdown,setShowdropdown] = useState(false)
return<>
    <nav>
        <div className="navdivleft">
            <img src="" alt="" />
            <p>Bibliothèque</p>
        </div>
        <ul>
          
                <div className="dflex">
                    <span className={darkmode=== true ?"timeframeblue" : "timeframegrey"}>Dark</span>
                    <div className={darkmode === false ? "toggle active" : "toggle"} onClick={()=>{dispatch(changetheme())}}>
                        <div className="circle2"></div>
                    </div>
                    <span className={darkmode=== false ?"timeframeblue" : "timeframegrey"}>Light</span>
                </div>
            
        
            <Link href="/"><li>Accueil</li></Link>
            <Link href="/livres/catalogue/"><li>Catalogue des Livres</li></Link>

            {isconnected == false ? 
                <Link href="/connexion/"><li><GrLogin /></li></Link>
            : 
                <li onClick={()=>{dispatch (disconnect()) }}  ><FaSignOutAlt /></li>
            }
            
            <Link href="/favoris/"><li><span className="heartnav"><FaHeart /></span>{favoris.length}</li></Link>
            <Link href="/panier"><li><BsCart /> <span className="paniernbr">{panier.length}</span></li></Link>
            {/* <img src="./burger.png" alt="" srcset="" /> */}
            <Image src="/burger.png" width={50} height={50} className="burger" onClick={()=>{setShowdropdown(!showdropdown)}} alt="menu" />
        </ul>
    </nav>
    <div className='dropdown'>
        <div onClick={()=>{setShowdropdown(!showdropdown)}}  className={showdropdown === true ? "dropdown-content show" : 'dropdown-content'}>
            
        
            <Link href="/"><li>Accueil</li></Link>
            <Link href="/livres/catalogue/"><li>Catalogue des Livres</li></Link>

            {isconnected == false ? 
                <Link href="/connexion/"><li><GrLogin /></li></Link>
            : 
                <a><li onClick={()=>{dispatch (disconnect()) }}  ><FaSignOutAlt /></li></a>
            }
            
            <Link href="/favoris/"><li><span className="heartnav"><FaHeart /></span>{favoris.length}</li></Link>
            <Link href="/panier"><li><BsCart /> <span className="paniernbr">{panier.length}</span></li></Link>

            <a><li>
                    <div className="dflex">
                        <span className={darkmode=== true ?"timeframeblue" : "timeframegrey"}>Dark</span>
                        <div className={darkmode === false ? "toggle active" : "toggle"} onClick={()=>{dispatch(changetheme())}}>
                            <div className="circle2"></div>
                        </div>
                        <span className={darkmode=== false ?"timeframeblue" : "timeframegrey"}>Light</span>
                    </div>
            </li></a>
        </div>
    </div>
</>
}