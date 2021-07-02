import React from "react";

import config from "../config/config";
import { callrestApi } from "../reducer/Reducer";
import { ButtonProps, Deal } from '../interfaces/interfaces'

function Button(props: ButtonProps) {
  const fetchDetails = () => {
    const deals = callrestApi(`${config.getDealDetailsUrl}${props.itemId}`);
    deals.then((details: Deal,) => {
        props.setDetails(details, props.itemId)
    })
    .catch((error) => {
        console.error(error)
    })
  }
  return (
    <div>
      {props.isBackEnabled ? <div className="button" onClick={props.unsetDetails}><span>Back</span></div> : <div className="button" onClick={fetchDetails}><span>See Details</span></div>}
    </div>
  );
}

export default Button;