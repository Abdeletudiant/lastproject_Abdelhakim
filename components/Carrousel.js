import {useState} from "react"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect } from "react"
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";
export default function Carrousel() {
    const dispatch = useDispatch();
    const darkmode= useSelector((reducer) => reducer.counter.darkmode)
    const [data, setData] = useState(null)
    const [chargee, setChargee] = useState(false)

    const[random1,setRandom1] = useState(0)
    useEffect(() => {
        setRandom1(Math.floor(Math.random() * 230))
    }, [])
    

    useEffect(() => {
        fetch("https://example-data.draftbit.com/books")
        .then((response) => response.json())
        .then((response) => setData(response))
        .then(() => setChargee(true))   
        .catch((error) => console.log(error))
    }, [])

    // click : margin-left: -180px;
    const[click,setClick]= useState(0)
    function next() {
        if(click <= 3){
            setClick(click+1)
        }else {
            setClick(0)
        }
    }
    function previous() {
        if (click >=1){
            setClick(click-1)
        } else {
            setClick(0)
        }
    }
return(<>
    {chargee ? <>
    
    
        
            <div className="window_showimg transitionlefttoright">
                <div className={
                    click === 0 ? "fleximg click0" :
                    click === 1 ? "fleximg click1" :
                    click === 2 ? "fleximg click2" :
                    click === 3 ? "fleximg click3" :
                    click === 4 ? "fleximg click4" :
                    ""}
                    >
                    <Link  href={"/livres/"+data[random1].id}>
                        <img src={data[random1].image_url} alt="" className={click==0 && "img0"} />
                        <p className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{data[random1].title}</p>
                        <p className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {data[random1].rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                    </Link>

                    <Link  href={"/livres/"+data[random1+1].id}>
                        <img src={data[random1+1].image_url} alt="" className={click==1 && "img1"} />
                        <p className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{data[random1+1].title}</p>
                        <p className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {data[random1+1].rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                    </Link>

                    <Link  href={"/livres/"+data[random1+2].id}>
                        <img src={data[random1+2].image_url} alt="" className={click==2 && "img2"} />
                        <p className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{data[random1+2].title}</p>
                        <p className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {data[random1+2].rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                    </Link>

                    <Link  href={"/livres/"+data[random1+3].id}>
                        <img src={data[random1+3].image_url} alt="" className={click==3 && "img3"} />
                        <p className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{data[random1+3].title}</p>
                        <p className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {data[random1+3].rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                    </Link>

                    <Link  href={"/livres/"+data[random1+4].id}>
                        <img src={data[random1+4].image_url} alt="" className={click==4 && "img4"} />
                        <p className={darkmode ? "textaligncenter pwhite" : "textaligncenter pblack"}>{data[random1+4].title}</p>
                        <p className={darkmode ? "textaligncenter pwhite mb20px" : "textaligncenter pblack mb20px"}>Notes : {data[random1+4].rating} <AiFillStar className={darkmode ? "yellow" :"lightstar"} /></p>
                    </Link>
                    
                    
                    
                    
                    
                </div>
            </div>
            <div className="flexbtn transitionlefttoright">
                <button onClick={()=>{previous()}} className="btnactivcarousel"><AiOutlineArrowLeft /></button>
                <button onClick={()=>{next()}} className="btnactivcarousel"><AiOutlineArrowRight /></button>
            </div>
            

        
        
    
        
    </>
    : <>
        <div className='divloading mt20px'>
            <div className='loading'></div>
            <p className='mt20px' id='loading'>Loading ...</p>
        </div>
    </>
    }

</>)
}