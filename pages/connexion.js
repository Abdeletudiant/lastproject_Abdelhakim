import { useState } from "react";
import { disconnect, seconnecter, createaccount } from "../app/features/CounterSlice"
import Navbar from "../components/Navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux'
// import { changetheme } from "./../../app/features/CounterSlice";
export default function Connexion() {
    const dispatch = useDispatch();
    const darkmode= useSelector((reducer) => reducer.counter.darkmode)
    const isconnected= useSelector((reducer) => reducer.counter.isconnected)

    const[usernamestate, setUsernamestate] = useState("")
    const[passwordstate, setPasswordstate] = useState("")


    const[newusername,setNewusername] = useState("")
    const[newusername2,setNewusername2] = useState("")
    const[newpassword,setNewpassword] = useState("")
    const[newpassword2,setNewpassword2] = useState("")

    const [wantaccount, setWantaccount] = useState(true)
    


return(<>
    <Navbar />
    <section className={darkmode ? "containerarticles darkbg connexion" : "containerarticles connexion"}>
    <div className="divlogin">
        {isconnected== false && wantaccount==true && <>
            <input type="email" onChange={(e)=>{setNewusername(e.target.value)}} placeholder="your email" />
            <input type="email" onChange={(e)=>{setNewusername2(e.target.value)}} placeholder="Retype your email" />
            <input type="password" onChange={(e)=>{setNewpassword(e.target.value)}} placeholder="your password" />
            <input type="password" onChange={(e)=>{setNewpassword2(e.target.value)}} placeholder="Retype your password" />

            {newusername !=""  && newusername2 != "" && newusername == newusername2 && newpassword== newpassword2 && newpassword2!="" && newpassword!="" ? <> 
                <button className="btnlogin" onClick={()=>{dispatch (createaccount({username: newusername, password: newpassword})), setWantaccount(false) }} >Sign up</button> </>
            :
                <p className={darkmode ? "pwhite" : "pblack"}>Please enter the same email and pasword</p>
            }
             
            <p className="iwant" onClick={()=>{setWantaccount(false)}}>I want to login to my account</p>
        </>}
        {isconnected== false && wantaccount==false && <>
            <input type="email" onChange={(e)=>{setUsernamestate(e.target.value)}} placeholder="your email" />
            <input type="password" onChange={(e)=>{setPasswordstate(e.target.value)}} placeholder="your password" />
            <button className="btnlogin" onClick={()=>{dispatch (seconnecter({username: usernamestate, password: passwordstate})) }} >Sign in</button>
            <p className="iwant" onClick={()=>{setWantaccount(true)}} >I want to create a account</p>
        </>}
        {isconnected== true &&
            <button className="btnlogin" onClick={()=>{dispatch (disconnect()) }} >Log Out</button>
        }
        
    </div>
    </section>
</>)
}