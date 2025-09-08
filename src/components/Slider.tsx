'use client'

import { useState, useRef, useEffect } from 'react'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  'aria-label': string
}

export function Slider({ value, onChange, min, max, step, 'aria-label': ariaLabel }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValue(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateValue = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const newValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(newValue / step) * step
    
    onChange(Math.max(min, Math.min(max, steppedValue)))
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={(e) => {
          let newValue = value
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            newValue = Math.max(min, value - step)
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            newValue = Math.min(max, value + step)
          } else if (e.key === 'Home') {
            newValue = min
          } else if (e.key === 'End') {
            newValue = max
          }
          
          if (newValue !== value) {
            onChange(newValue)
          }
        }}
      >
        <div
          className="absolute top-0 left-0 h-2 bg-primary-500 rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 w-4 h-4 bg-primary-500 rounded-full shadow-md transform -translate-y-1/2 transition-all duration-150 hover:scale-110 focus:scale-110"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  )
}
