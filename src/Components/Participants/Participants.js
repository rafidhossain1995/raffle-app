import React,{useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "../Participants/Participants.css"

const Participants = ()=>{
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
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
   
            <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              {user.firstname}{user.lastname}
              </Typography>
              <Typography variant="h5" component="h2">
              {user.id}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              {user.email}
              </Typography>
              <Typography variant="body2" component="p">
              {user.phone ? user.phone : "none"}
              </Typography>
            </CardContent>
          </Card>
        )
    }) 

    return(
        <div className="partic">
            <Navbar/>
            <h1>All Raffle Participants</h1>
            <ul>{allRaffleUsers}</ul>
        </div>
    )
}
export default Participants