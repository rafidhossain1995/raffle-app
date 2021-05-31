import React from "react"
import {useParams, NavLink} from "react-router-dom"

const Navbar = ()=>{
    const params = useParams ("/raffle/:id")
    const {id} = params    
    return(
    <div>
        <NavLink to ={"/"}><button>All Raffles</button></NavLink>
        <NavLink to = {`/raffles/${id}`}><button>Register</button></NavLink>
        <NavLink to ={`/raffles/${id}/participants`}><button>Participants</button></NavLink>
        <NavLink to ={`/raffles/${id}/winner`}><button>Pick A Winner</button></NavLink>
        
    </div>
    )
}
export default Navbar