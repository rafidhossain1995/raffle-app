import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { useInput } from "../../Util/CustomHook/useInput"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
const Winner = ()=>{
    const [raffleUser, setRaffleUser] = useState("")
    const [raffleToken, setRaffleToken] = useState("")
    const [raffleWinner, setRaffleWinner] = useState({})
    const [displayWinner, setDisplayWinner] = useState(false)
    

    const secretKey = useInput("")
    const params = useParams ("/raffle/:id")
    const {id} = params

    // if our get winner function returns a response of an object with information in it
    // then we wnat to se the display winner to true 

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }


useEffect(()=>{
    const getWinner = async()=>{
        try{
           let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/winner`)
           debugger
           if(!isEmpty(res.data)){
               setRaffleWinner(res.data)
               setDisplayWinner(true)
           }else{
               window.alert("No Participants At The Moment")
           }
        
        }catch(err){
            console.log(err)
        }
    }
    getWinner()
},[displayWinner])

 useEffect(()=>{
    const getRaffle = async ()=>{
        try{
            let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}`)
            setRaffleToken(res.data.secret_token)
        }catch(err){
            console.log(err)
        }
    }
    getRaffle()
 },[])

 useEffect(()=>{
    const getRaffleUsers = async ()=>{
        try{
            let res = await axios.get (
                `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`
              );
              setRaffleUser(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getRaffleUsers()
 },[])



 const getRaffleWinner = async (e)=>{
    e.preventDefault()
    if(secretKey.value === raffleToken){
        try{
          let res =  await axios.put(
                `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/winner`,
                { secret_token: secretKey.value }
                );
                setRaffleWinner(res.data)
                setDisplayWinner(true)
                debugger
        }catch(err){
            console.log(err)
        }
    } else{
        window.alert("Not Correct")
    }
 }



//  const pickWinner = (raffleUser)=>{
//      let winner = raffleUser[Math.floor(Math.random()*raffleUser.length)]
//      setRaffleWinner(winner)
//      debugger
//      return(
//          <div>
//             <h3>{winner.firstname}</h3> 
//          </div>
//      )

//  }

//  const newArray = ()=>{
//      let output = []
//      let raffleWinner = Object.keys(raffleWinner)
//     output.push(raffleWinner)
//     return raffleWinner
//  }

 
    return(
        
        <div>
            <Navbar/>
            <h1>Get The Winner!!!!</h1>
        {!displayWinner ? (
            <form onSubmit = {getRaffleWinner}>
            <label>
                Enter Secret Key:
                <input type="text" {...secretKey}/>
            </label>
            <button type="submit">Pick Winner</button>
        </form>
        ):(
        <>
            <div>{raffleWinner.firstname}</div>
            <div>{raffleWinner.lastname}</div>
            
         
        </>
            
        )}  
            
            
            
            {/* {pickWinner(raffleUser)} */}
        </div>
        

    )
}
export default Winner