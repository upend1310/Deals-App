import React, { useReducer } from "react";

import Button from "./Button";
import { reducer, SET_DEAL_DETAILS, SET_SELECTED_DEAL_ID, UNSET_DETAILS } from '../reducer/Reducer'
import { CardProps, CardInitialState, Deal } from '../interfaces/interfaces'

const initialState: CardInitialState = { details: undefined, selectedDealId: undefined }

function Card(props: CardProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDetails = (details: Deal, id: string) => {
    dispatch({ type: SET_DEAL_DETAILS, details })
    dispatch({ type: SET_SELECTED_DEAL_ID, id })
  }

  const unsetDetails = () => {
    dispatch({ type: UNSET_DETAILS })
  }

  return (
    <div key={props.cardId}>
      <div className="deal__card">
        <div className="element element-1">
          {props?.cardData?.media?.length > 0 && <div className='img__wrapper'><img src={props?.cardData?.media[0]} /></div>}
          {state.selectedDealId === props?.cardData?.key ? (
            <div className='description'>{state.details.description}</div>
          ) : (<div className='card__detail'>
            <div>{props?.cardData?.title}</div>
            <div>Rs. {props?.cardData?.price}</div>
          </div>)}
        </div>
      </div>
      {state.selectedDealId === props?.cardData?.key ? <Button isBackEnabled={true} unsetDetails={unsetDetails} itemId={props?.cardData?.key} /> : <Button setDetails={setDetails} itemId={props?.cardData?.key} />}
    </div>
  );
}

export default Card;
