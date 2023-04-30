import React from 'react';

const Card = ({ name, email})=>{
    return(
        <div className='tc bg-light-green dib br pa3 ma2 grow bw2 shadow-5'>
            <img src={`https://robohash.org/69 `}  width="200" 
     height="200"/>
            <div>{name}</div>
            <p>{email}</p>

        </div>
    )
}

export default Card   ;
