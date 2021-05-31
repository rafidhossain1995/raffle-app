import React,{useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import axios from "axios"

const Participants = ()=>{
    const [raffleUsers, setRaffleUsers] = useState([])
    const params = useParams("/raffle/:id/")
    const {id} = params

    const getAllParticipants = async ()=>{
        try{
            let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`)
            setRaffleUsers(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllParticipants()
    },[])

    let allRaffleUsers = raffleUsers.map((user, i)=>{
        return(
            <li key={i}>
                <h2>{user.firstname}{user.lastname}</h2>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.phone ? user.phone : "none"}</p>
            </li>
        )
    }) 

    return(
        
        <div>
            <Navbar/>
            <h1>All Raffle Participants</h1>
            <ul>{allRaffleUsers}</ul>
        </div>
    )
}
export default Participants