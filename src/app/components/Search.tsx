import React, { useCallback } from "react";

import { groupDeals } from './Main';
import config from "../config/config";
import { callrestApi } from "../reducer/Reducer";
import { Deal, GroupedData, SearchProps } from '../interfaces/interfaces'

function debounce(func: any, wait: any) {
  let timeout: any;
  return function (...args: any) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

function Search(props: SearchProps) {
  const debounceOnChange = useCallback(debounce(onChange, 200), []);

  function onChange(value: string) {
    callrestApi(`${config.quickSearchUrl}${value}`)
      .then((dealsArr: Deal[]) => {
        const groupedDeals: GroupedData = groupDeals(dealsArr);
        props.setSearchedDeals(groupedDeals)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <form>
        <div className="finder">
          <div className="finder__outer">
            <div className="finder__inner">
              <div className="finder__icon"></div>
              <input
                className="finder__input"
                type="text"
                name="deal"
                onChange={(e) => debounceOnChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
