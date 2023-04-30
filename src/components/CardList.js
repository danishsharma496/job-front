import { map } from "lodash";
import React from "react";
import Card from "./Card";

const Cardlist = ({ robots }) => {

    const cardArray = robots.map((user, i) => {
        return <Card
        key ={i}
        name={robots[i].name} 
        email={robots[i].email} />
    }
    
    )

    
    

    // card i is an array here 
    return (
        <div >
            {cardArray}
        </div>

        // we can put map itself inside 
    )

}

export default Cardlist;