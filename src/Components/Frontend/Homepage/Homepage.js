import React, {useState, useEffect} from "react"
import cors from 'cors'
import axios from 'axios'

const Homepage = ()=>{
    

    const API = 'https://raffle-fs-app.herokuapp.com'

    const fetchData = async () => {
        try {
          let res = await axios.get(`${API}/api/raffles`);
          debugger;
          //   let data = res.data.body;
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        fetchData()
      },[])
    return(
        <form >
            <h1>Raffle App</h1>
            <h3>New Raffle</h3>
            <label>
                <input type="text" name="raffle-name"/>
                <br/>
                <input type="text" name="secret-code"/>

            </label>
        </form>
    
    )
}

export default Homepage