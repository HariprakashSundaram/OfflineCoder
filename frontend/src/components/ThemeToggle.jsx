import React from 'react'
import { MoonIcon, SunIcon } from './Icons'
import './ThemeToggle.css'

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeToggle
