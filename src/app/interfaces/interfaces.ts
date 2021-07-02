export interface Deal {
    cause: {
        name: string
    }
    key: string
    media: string[]
    price: number
    title: string
}

export interface GroupedData {
    [key: string] : Deal
}

export interface SearchProps {
    setSearchedDeals: (groupedDeals: GroupedData) => void
}

export interface CardProps {
    cardData?: Deal
    cardId?: string
}

export interface ButtonProps {
    isBackEnabled?: boolean
    unsetDetails?: () => void
    itemId?: string
    setDetails?: (details: Deal, id: string) => void
}

export interface CardInitialState {
    details?: Deal
    selectedDealId?: string
}