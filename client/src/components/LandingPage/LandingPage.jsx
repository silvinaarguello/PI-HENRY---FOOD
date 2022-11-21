import React from 'react';
import {Link} from 'react-router-dom';
  


export default function LandingPage() {
return(
    <div className=''>
        <h1>Henry Food</h1>
        <p>App where you will find thousands of recipes according to your tastes and preferences</p>
        <Link to= '/home'>
            <button className=''>Let's cook</button>
        </Link>

    </div>
)
}