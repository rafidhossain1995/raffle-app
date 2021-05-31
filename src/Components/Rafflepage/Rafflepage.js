import React, {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
// import {useInput} from "../../../Util/CustomHook"
import axios from "axios"
import Navbar from "../Navbar/Navbar"

const Rafflepage = ()=>{
    const [raffle, setRaffle] = useState ([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const params = useParams ("/raffle/:id")
    const {id} = params    

    const handlefirstName = (e)=>{
        e.preventDefault()
        setFirstName(e.target.value)
        console.log(e.target.value)
    }

    const handleLastName = (e)=>{
        e.preventDefault()
        setLastName(e.target.value)
        console.log(e.target.value)
    }

    const handlePhone = (e)=>{
        e.preventDefault()
        setPhone(e.target.value)
        console.log(e.target.value)
    }

    const handleEmail = (e)=>{
        e.preventDefault()
        setEmail(e.target.value)
        console.log(e.target.value)
    }


useEffect (()=>{
    const getRaffle = async()=>{
        try{
            let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}`)
            setRaffle(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getRaffle()
},[])

const saveRaffleApplicants = async(e)=>{
    e.preventDefault()
    const newApplicants = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone
    }
    try{
        await axios.post(`https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`,
        newApplicants)  
        debugger
        
    }catch(err){
        console.log(err)
    }
}


    return(
        <>
        <Navbar/>
        <div>
            <h2>{raffle.name}</h2>
            <form onSubmit = {saveRaffleApplicants}>
            
                <label>
                    First Name:
                <input type="text" 
                    onChange={handlefirstName}
                    name="first_name" 
                    placeholder="First Name"
                    // value={name}
                    required/>
                </label>
    
                <label>
                    Last Name:
                <input type="text" 
                    onChange={handleLastName}
                    name="last_name" 
                    placeholder="Last Name"
                    // value={name}
                    required/>
                </label>
    
                <label>
                    Email:
                <input type="text" 
                    onChange={handleEmail}
                    name="email" 
                    placeholder="Email"
                    // value={name}
                    required/>
                </label>
    
                <label>
                    Phone Number
                <input type="text" 
                    onChange={handlePhone}
                    name="Phone" 
                    placeholder="Phone Number"
                    // value={name}
                    />
                </label>
                <button type="submit">Register for Raffle</button>
            </form>
        </div>
        </>
    )
}
    
    
export default Rafflepage