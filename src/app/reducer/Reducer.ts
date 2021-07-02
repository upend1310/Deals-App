
export const SET_DEALS = '@@SET_DEALS'
export const SET_SEARCHED_DEALS = '@@SET_SEARCHED_DEALS'
export const SET_DEAL_DETAILS = '@@SET_DEAL_DETAILS'
export const SET_SELECTED_DEAL_ID = '@SET_SELECTED_DEAL_ID'
export const UNSET_DETAILS = '@@UNSET_DETAILS'

export function reducer(state: any, action: any) {
    const groupedDeals = action?.groupedDeals
    switch (action.type) {
      case SET_DEALS:
        return {...state, groupedDeals }
    case SET_SEARCHED_DEALS:
        let newState = state
        delete newState.groupedDeals
        return {...newState, groupedDeals }
    case SET_DEAL_DETAILS:
        return { ...state, details: action?.details }
    case SET_SELECTED_DEAL_ID:
        return { ...state, selectedDealId: action?.id }
    case UNSET_DETAILS:
        return { ...state, details: undefined, selectedDealId: undefined }
    default:
        throw new Error();
    }
  }

export async function callrestApi(url: string) {
    try {
        let res = await fetch(url);
        return res.json();
    } catch (error) {
        console.error(error);
    }
}
  