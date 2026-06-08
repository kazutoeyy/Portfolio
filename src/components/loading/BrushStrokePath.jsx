import { forwardRef } from 'react'

const BrushStrokePath = forwardRef((props, ref) => {
  return (
    <svg 
      ref={ref}
      width="100%" 
      height="100%" 
      viewBox="0 0 400 120" 
      preserveAspectRatio="xMidYMid meet"
      className="w-full max-w-[400px]"
    >
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        className="ink-text"
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '64px', 
          fontStyle: 'italic', 
          fill: 'transparent',
          strokeWidth: 1.5,
          strokeDasharray: 400,
        }}
      >
        Gia Huy
      </text>
    </svg>
  )
})

BrushStrokePath.displayName = 'BrushStrokePath'

export default BrushStrokePath
