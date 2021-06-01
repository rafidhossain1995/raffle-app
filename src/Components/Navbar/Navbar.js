import React from "react"
import {useParams, NavLink} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Navbar = ()=>{
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
    const classes = useStyles();
    const params = useParams ("/raffle/:id")
    const {id} = params    
    return(
        <div variant="contained" color="primary" >
            <NavLink to ={"/"}><Button variant="contained" color="primary" >All Raffles</Button></NavLink>
            <NavLink to = {`/raffles/${id}`}><Button variant="contained" color="primary" >Register</Button></NavLink>
            <NavLink to ={`/raffles/${id}/participants`}><Button variant="contained" color="primary" >Participants</Button></NavLink>
            <NavLink to ={`/raffles/${id}/winner`}><Button variant="contained" color="primary" >Pick A Winner</Button></NavLink>
        </div>
    )
}
export default Navbar