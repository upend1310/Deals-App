import React, { useReducer, useEffect } from "react";

import Search from "./Search";
import Card from "./Card";
import config from '../config/config'
import { Deal, GroupedData } from '../interfaces/interfaces'

import { reducer, SET_DEALS, SET_SEARCHED_DEALS, callrestApi } from '../reducer/Reducer'

const initialState: GroupedData = { groupedDeals: undefined };

export const groupDeals = (deals: Deal[]) => {
  return deals?.reduce((groupedDeals: any, currentValue: any) => {
      (groupedDeals[currentValue?.cause?.name?.toLowerCase()?.replaceAll(/[^a-zA-Z]/g, "")] = groupedDeals[currentValue?.cause?.name?.toLowerCase()?.replaceAll(/[^a-zA-Z]/g, "")] || []).push(
          currentValue
      );
      return groupedDeals;
      }, {});
}

function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const deals = callrestApi(config.getDealsUrl);
    deals.then((dealsArr: Deal[]) => {
        const groupedDeals = groupDeals(dealsArr)
        dispatch({ type: SET_DEALS, groupedDeals });
    })
    .catch((error) => {
        console.error(error)
    })
  }, []);

  const setSearchedDeals = (groupedDeals: GroupedData) => {
    dispatch({ type: SET_SEARCHED_DEALS, groupedDeals });
  }

  const printDealGroups = (groupedDeals: GroupedData) => {
    return groupedDeals && Object.keys(groupedDeals)?.map((groupName: string, groupIndex: number) => {
      const deals = state.groupedDeals[groupName]
      return (<div className="container" key={`Group${groupIndex}`}>
      <div className="cards__container">
        <h2 className="main__heading">{deals[0].cause.name}</h2>
        <div className="d-flex">
          {
            deals?.map((deal: Deal, cardIndex: number) => <Card cardData={deal} key={`Group${groupIndex}-Card${cardIndex}`} cardId={`Group${groupIndex}-Card${cardIndex}`} />)
          }
        </div>
      </div>
    </div>)
    })
  }

  return (
    <div className="main">
      <div className="container-fluid">
        <h1 className="main__heading">Welcome to Mega Deal</h1>
        <Search setSearchedDeals={setSearchedDeals} />
        {printDealGroups(state?.groupedDeals)}
      </div>
    </div>
  );
}

export default Main;
