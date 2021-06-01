import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { useInput } from "../../Util/CustomHook/useInput"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import "../Winner/Winner.css"
const Winner = ()=>{
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
          },
          media: {
            height: 140,
          },
          
      });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
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



 
    return(
        
    <div className="winner-main">
            <Navbar/>
            <h1>Get The Winner</h1>

        {!displayWinner ? (
            <form onSubmit = {getRaffleWinner}>
            <label>
                Enter Secret Key:
                <input type="text" {...secretKey}/>
            </label>
            <button type="submit">Pick Winner</button>
        </form>
        ):(

        <div className="winner-selection">
        <Card className={classes.root} variant="outlined">
         <CardActionArea>
         <CardMedia
          className={classes.media}
          image="https://lh3.googleusercontent.com/proxy/npeXuntMJFAeF3_qP56GWXLLFKmVzdOQ9_JvfGwoaKb3YfYN9295JkZ3xx3pEikah_9v0XOju8Cw66knEAtfeujuc3fDl-I"
          title="Contemplative Reptile"
         />
            <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
               <h3>CONGRATULATIONS</h3>
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
              <h2>{raffleWinner.firstname}</h2>
              <h2>{raffleWinner.lastname}</h2>
              <h3>{raffleWinner.phone}</h3>
              <h3>{raffleWinner.email}</h3>
            <Typography gutterBottom variant="h5" component="h2">
            <h3>YOU ARE OUR WINNER!</h3>
            </Typography>
            </Typography>
            </CardContent>
         </CardActionArea>
        </Card>
     </div>
    )}  
    </div>
    )
}
export default Winner