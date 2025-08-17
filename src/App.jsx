import { useState } from 'react'
import LoadingScreen from './LoadingScreen'
import HomePage from './pages/HomePage'
import './App.css'
import './pages/black-text-override.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className="app">
      <HomePage />
    </div>
  )
}

export default App