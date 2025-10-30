// src/components/RecipeBox.tsx
import { useState } from 'preact/hooks'
import type { Recipe, CategoryMap } from '../types'
import { setDragData } from '../utils/drag'

import recipesData from '../data/recipes.json' with { type: 'json' }
import categoryMap from '../data/categoryMap.json' with { type: 'json' }

const recipes = recipesData as Recipe[]
const categories = categoryMap as CategoryMap

export function RecipeBox() {
    const [recipeList, setRecipeList] = useState<Recipe[]>(recipes)
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const toggleCouple = (id: string) => {
        setRecipeList(recs =>
            recs.map(r => r.id === id ? { ...r, isCouple: !r.isCouple } : r)
        )
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color:'yellow' }}>start here</h1>

            <div
                style={{
                    width: '320px',
                    border: '2px solid #ccc',
                    borderRadius: '12px',
                    padding: '1rem',
                    minHeight: '80vh',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    backgroundColor: '#f9f9f9'
                }}
            >
                <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', color: 'grey' }}>Recipes</h2>

                {recipeList.map(recipe => (
                    <div
                        key={recipe.id}
                        draggable
                        onDragStart={e => setDragData(e, JSON.stringify(recipe))}
                        style={{
                            position: 'relative',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            marginBottom: '0.75rem',
                            backgroundColor: recipe.type === 'drink' ? '#1a3a1a' : '#2a2a2a',
                            color: '#f0f0f0',
                            cursor: 'grab',
                            boxShadow: hoveredId === recipe.id ? '0 4px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={() => setHoveredId(recipe.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '1.1rem' }}>{recipe.name}</strong>
                            <span
                                style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    backgroundColor: recipe.type === 'drink' ? '#22c55e' : '#3b82f6',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {recipe.type.toUpperCase()}
                            </span>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                checked={recipe.isCouple}
                                onChange={() => toggleCouple(recipe.id)}
                                style={{ marginRight: '0.5rem' }}
                            />
                            Couple Meal
                        </label>

                        {hoveredId === recipe.id && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    zIndex: 10,
                                    marginTop: '0.5rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                            >
                                <strong>Ingredients:</strong>
                                <ul style={{ margin: '0.5rem 0 0 1.2rem', padding: 0 }}>
                                    {recipe.ingredients.map((ing, i) => (
                                        <li key={i}>
                                            {ing.quantity} {ing.unit} {ing.name}{' '}
                                            <em style={{ color: '#aaa' }}>
                                                [{ing.category || categories[ing.name] || '—'}]
                                            </em>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}