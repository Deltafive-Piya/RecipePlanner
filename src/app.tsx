// src/app.tsx
import './app.css'
import { RecipeBox } from './components/RecipeBox'
import { Calendar } from './components/Calendar'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        padding: '1rem',
        minHeight: '100vh',
        backgroundColor: '#111',
        color: '#f0f0f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <RecipeBox />
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.6rem' }}>Calendar</h2>
        <Calendar />
        {/* GroceryList is now INSIDE Calendar */}
      </div>
    </div>
  )
}