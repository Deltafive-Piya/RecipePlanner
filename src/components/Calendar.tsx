import { useState } from 'preact/hooks'
import type { Recipe } from '../types'
import { getDragData } from '../utils/drag'
import { GroceryList } from './GroceryList'

type Slot = Recipe | null
type Day = {
    breakfast: Slot
    lunch: Slot
    dinner: Slot
}

const emptyDay = (): Day => ({
    breakfast: null,
    lunch: null,
    dinner: null,
})

export function Calendar() {
    const [week, setWeek] = useState<Day[]>([
        emptyDay(),
        emptyDay(),
        emptyDay(),
        emptyDay(),
        emptyDay(),
        emptyDay(),
        emptyDay(),
    ])

    const handleDrop = (dayIdx: number, meal: keyof Day, recipe: Recipe) => {
        setWeek(prev =>
            prev.map((d, i) =>
                i === dayIdx ? { ...d, [meal]: recipe } : d
            )
        )
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
    }

    const MealSlot = ({
        dayIdx,
        meal,
        slot,
    }: {
        dayIdx: number
        meal: keyof Day
        slot: Slot
    }) => (
        <div
            style={{
                minHeight: '3rem',
                border: '1px dashed #555',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                marginBottom: '0.25rem',
                backgroundColor: slot ? '#2c4c2c' : '#222',
                color: '#f0f0f0',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: slot ? 'space-between' : 'center',
            }}
            onDrop={e => {
                e.preventDefault()
                const recipe = getDragData<Recipe>(e)
                if (recipe) handleDrop(dayIdx, meal, recipe)
            }}
            onDragOver={handleDragOver}
        >
            {slot ? (
                <>
                    <span>{slot.name}</span>
                    <button
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ff6b6b',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => {
                            setWeek(prev =>
                                prev.map((d, i) =>
                                    i === dayIdx ? { ...d, [meal]: null } : d
                                )
                            )
                        }}
                    >
                        X
                    </button>
                </>
            ) : (
                <em style={{ opacity: 0.5 }}>Drop {meal} here</em>
            )}
        </div>
    )

    const DayColumn = ({ dayIdx }: { dayIdx: number }) => {
        const day = week[dayIdx]
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        return (
            <div
                style={{
                    flex: 1,
                    minWidth: '140px',
                    margin: '0 0.5rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#f0f0f0',
                }}
            >
                <h3 style={{ margin: '0 0 0.75rem', textAlign: 'center', fontSize: '1rem' }}>
                    {dayNames[dayIdx]}
                </h3>

                <MealSlot dayIdx={dayIdx} meal="breakfast" slot={day.breakfast} />
                <MealSlot dayIdx={dayIdx} meal="lunch" slot={day.lunch} />
                <MealSlot dayIdx={dayIdx} meal="dinner" slot={day.dinner} />
            </div>
        )
    }

    return (
        <div>
            <div style={{ overflowX: 'auto' }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        paddingBottom: '1rem',
                    }}
                >
                    {[0, 1, 2, 3, 4, 5, 6].map(idx => (
                        <DayColumn key={idx} dayIdx={idx} />
                    ))}
                </div>
            </div>

            {/* Grocery List — receives full week state */}
            <GroceryList week={week} />
        </div>
    )
}