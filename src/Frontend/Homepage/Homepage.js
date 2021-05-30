import React from "react"

const Homepage = ()=>{
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