import React, {useState, useEffect} from "react"
import {useInput} from "../../../Util/CustomHook/useInput"
import cors from 'cors'
import axios from 'axios'


const Homepage = ()=>{
    const [raffleHome, setRaffleHome] = useState("")
    const [secretToken, setSecretToken] = useState("")
    const [allRaffle, setAllRaffle] = useState([])
    const [raffleFail, setRaffleFail] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [created_at, setCreated_at] = useState("")
    const [raffled_at, setRaffled_at] = useState("")


    const handleInput = (e, setValue)=>{
        e.preventDefault()
        setValue(e.target.value)
    }
    

    const API = 'https://raffle-fs-app.herokuapp.com'
    
    const addRaffle = async()=>{
        try{
            let res = await axios.post('https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffle',
            {
                id: id,
                name: name,
                created_at: created_at,
                raffled_at: raffled_at,
                secretToken: secretToken
            })
            debugger
        }catch(error){
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
          let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles`);
          setAllRaffle(res.data)
        } catch (error) {
            console.log(error);
            setRaffleFail("this is not working")
        }
      };

      useEffect(()=>{
        fetchData()
      },[])

      let currentRaffle = allRaffle.map((raffle, i)=>{
          return(
              <li key={i}>
                  <h3>{raffle.name}</h3>
                  <p>Created on:{raffle.created_at}</p>
                  <p>Winner ID: {raffle.winner_id === null ? "None Selected" : raffle.created}</p>
                  <p>Raffled On: {raffle.raffled_at === null? "None created" : raffle.raffled_at}</p>
              </li>
          )
      })
    return(
    <>
        <form >
            <h1>Raffle App</h1>
            <h3>New Raffle</h3>
            <label>
                <input type="text" 
                onChange ={(e)=>handleInput(e, setRaffleHome)}
                name="raffle-name" 
                placeholder="raffle name" 
                value={raffleHome}
                required/>
                <br/>
                <input type="text" 
                onChange ={(e)=>handleInput(e, setSecretToken)} 
                name="secret-code" 
                placeholder="secret token" 
                value={secretToken}
                required/>
                <br/>
                <button type="submit"onClick = {() => addRaffle()}>Create Raffle</button>
            </label>
        </form>
    <h2>All Raffles</h2>
       <ul>{currentRaffle}</ul>
    </>
    
        
    
    )
}

export default Homepage