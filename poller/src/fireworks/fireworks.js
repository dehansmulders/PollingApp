import { Typography } from "@material-ui/core";
import React from "react";
import './fireworks.css';

export default function FireWorks(props) {

    if(props.show){
        return (
            <>
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>
            <Typography className="pyrotext" variant={'h2'}>{props.text}</Typography>
            </>
        )
    } else return null;
    
}