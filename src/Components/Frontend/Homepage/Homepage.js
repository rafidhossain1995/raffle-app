import React, {useState, useEffect} from "react"
import {useInput} from "../../../Util/CustomHook/useInput"
import {Link} from "react-router-dom"
import cors from 'cors'
import axios from 'axios'


const Homepage = ()=>{
    const [raffleHome, setRaffleHome] = useState("")
    const [allRaffle, setAllRaffle] = useState([])
    const [raffleFail, setRaffleFail] = useState("")
    const [name, setName] = useState("")
    const [secret_token, setSecret_Token] = useState("")
 


    const handleName = (e)=>{
        e.preventDefault()
        setName(e.target.value)
        console.log(e.target.value)
    }

    const handleSecret = (e)=>{
        e.preventDefault()
        setSecret_Token(e.target.value)
        console.log(e.target.value)
    }

    const API = 'https://raffle-fs-app.herokuapp.com'
    
   

    const fetchData = async () => {
        try {
          let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles`);
          setAllRaffle(res.data)
        //   debugger
        } catch (error) {
            console.log(error);
            setRaffleFail("this is not working")
        }
      };

      useEffect(()=>{
        fetchData()
      },[])

      


    const addRaffle = async (e) => {
            e.preventDefault();
            const newRaffle = {
              name: name,
              secret_token: secret_token
            };
            try {
              await axios.post(
                "https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/",
                newRaffle
              );
              fetchData();
            } catch (err) {
              console.log(err);
            }
          };

     let currentRaffle = allRaffle.map((raffle, i)=>{
        return(
            <Link key = {i} to={`/raffles/${raffle.id}`} >
                <li>
                    <button>
                        <h3>{raffle.name}</h3>
                        <p>Created On: {raffle.created_at}</p>
                        <p> Winner ID: {raffle.winner_id === null ? "None Selected" : raffle.winner_id} </p>
                        <p>Raffle On: {raffle.raffled_at === null ? "None Selected" : raffle.raffled_at}</p>
                    </button>
                </li>

            </Link>
        )
     })

    return(
    <>
        <form onSubmit = {addRaffle}>
            <h1>Raffle App</h1>
            <h3>New Raffle</h3>
            <label>
                <input type="text" 
                onChange={handleName}
                name="raffle-name" 
                placeholder="raffle name"
                // value={name}
                required/>
                <br/>
                <input type="text" 
                onChange={handleSecret}
                // value={secret_token}
                name="secret-code" 
                placeholder="secret token" 
                required/>
                <br/>
                <button type="submit">Create Raffle</button>
            </label>
        </form>
    <h2>All Raffles</h2>
       <ul>{currentRaffle}</ul>
    </>
    
        
    
    )
}

export default Homepage