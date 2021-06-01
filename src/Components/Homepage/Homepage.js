import React, {useState, useEffect} from "react"
import {useInput} from "../../Util/CustomHook/useInput"
import {Link} from "react-router-dom"
import cors from 'cors'
import axios from 'axios'
import "../Homepage/Homepage.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// each component in css do a 100 view height (100vh)

const Homepage = ()=>{
    const [raffleHome, setRaffleHome] = useState("")
    const [allRaffle, setAllRaffle] = useState([])
    const [raffleFail, setRaffleFail] = useState("")
    const [name, setName] = useState("")
    const [secret_token, setSecret_Token] = useState("")
    
    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }));

    const useStyles2 = makeStyles((theme) => ({
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
    }));

  



    const classes1 = useStyles();
    const classes2 = useStyles2()
    const bull = <span className={classes2.bullet}>•</span>;
    


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
              <CardMedia >
                <li>
                  <button>
                        <Card className={classes2.root} variant="outlined">
                                <CardContent>
                                  <Typography className={classes2.title} color="textSecondary" gutterBottom>
                                  <h3>{raffle.name}</h3>
                                  <p>Created On: {raffle.created_at}</p>
                                  </Typography>
                                  <Typography variant="h5" component="h2">
                                  <p> Winner ID: {raffle.winner_id === null ? "None Selected" : raffle.winner_id} </p>
                                  </Typography>
                                  <Typography className={classes2.pos} color="textSecondary">
                                <p>Raffle On: {raffle.raffled_at === null ? "None Selected" : raffle.raffled_at}</p> 
                                  </Typography>
                                </CardContent>
                              </Card>
                    </button>
                </li>
              </CardMedia> 
            </Link>
        )
     })

    return(
    <div className="body">
        <form onSubmit = {addRaffle}>
            <h1 className="raffle-app">Raffle App</h1>
            <h3 classes="new-raffle">New Raffle</h3>
            <label>
                <input type="text" 
                onChange={handleName}
                name="raffle-name" 
                placeholder="raffle name"
                id="filled-basic" variant="filled"
                // value={name}
                required/>
                <br/>
            </label>
            <label>
                <input type="text" 
                onChange={handleSecret}
                // value={secret_token}
                name="secret-code" 
                placeholder="secret token" 
                id="filled-basic"  variant="filled"
                required/>
                <br/>
                <div className ={classes1.root}>
                <Button variant="contained" color="primary" type="submit">Create Raffle</Button>
                </div>  
            </label>
        </form>
    <h2>All Raffles</h2>
       <ul>{currentRaffle}</ul>
    </div>
    
        
    
    )
}

export default Homepage