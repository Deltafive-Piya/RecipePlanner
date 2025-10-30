export interface Ingredient {
    name: string
    quantity: number
    unit: string
    category?: string
}

export interface Recipe {
    id: string
    name: string
    type: 'meal' | 'drink'
    ingredients: Ingredient[]
    isCouple: boolean
}

export interface CategoryMap {
    [key: string]: string
}