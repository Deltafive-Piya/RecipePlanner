import { useMemo } from 'preact/hooks'
import type { Recipe } from '../types'

// Technical category order (used as fallback)
const CATEGORY_ORDER = [
    'Produce',
    'Floral',
    'Bakery',
    'Deli',
    'Meat',
    'Seafood',
    'Dairy',
    'Frozen Foods',
    'Beverages',
    'Pantry Staples',
    'Baking',
    'Snacks',
    'Household',
    'Pharmacy/Wellness',
    'GreenWise/Organic',
] as const

type Category = typeof CATEGORY_ORDER[number]

interface GroceryItem {
    name: string
    quantity: number
    unit: string
    category: Category
}

export function GroceryList({ week }: { week: { breakfast: Recipe | null; lunch: Recipe | null; dinner: Recipe | null }[] }) {
    const groceries = useMemo(() => {
        const map = new Map<string, GroceryItem>()

        week.forEach(day => {
            ;[day.breakfast, day.lunch, day.dinner].forEach(recipe => {
                if (!recipe) return

                const multiplier = recipe.isCouple ? 2 : 1

                recipe.ingredients.forEach(ing => {
                    const key = `${ing.name}|${ing.unit}`
                    const category = (ing.category || 'Unknown') as Category

                    if (map.has(key)) {
                        const existing = map.get(key)!
                        existing.quantity += ing.quantity * multiplier
                    } else {
                        map.set(key, {
                            name: ing.name,
                            quantity: ing.quantity * multiplier,
                            unit: ing.unit,
                            category,
                        })
                    }
                })
            })
        })

        // Group by category
        const byCategory = new Map<Category, GroceryItem[]>()
        map.forEach(item => {
            const list = byCategory.get(item.category) || []
            list.push(item)
            byCategory.set(item.category, list)
        })

        // Sort items in each category
        byCategory.forEach(list => {
            list.sort((a, b) => a.name.localeCompare(b.name))
        })

        // Get used categories, sort alphabetically by name
        const usedCategories = Array.from(byCategory.keys())
            .filter(cat => byCategory.get(cat)!.length > 0)
            .sort((a, b) => a.localeCompare(b))

        return { byCategory, usedCategories }
    }, [week])

    if (groceries.usedCategories.length === 0) {
        return (
            <div style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.6 }}>
                <em>No recipes selected yet. Drag recipes to the calendar to build your grocery list.</em>
            </div>
        )
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.6rem' }}>Grocery List</h2>

            {groceries.usedCategories.map(category => {
                const items = groceries.byCategory.get(category)!
                return (
                    <div key={category} style={{ marginBottom: '1.5rem' }}>
                        <h3
                            style={{
                                margin: '0 0 0.5rem',
                                fontSize: '1.2rem',
                                color: '#a0d8a0',
                                borderBottom: '1px solid #444',
                                paddingBottom: '0.25rem',
                            }}
                        >
                            {category}
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', listStyle: 'disc' }}>
                            {items.map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                                    <strong>{item.name}</strong>{' '}
                                    <span style={{ opacity: 0.8 }}>
                                        {item.quantity} {item.unit || ''}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}