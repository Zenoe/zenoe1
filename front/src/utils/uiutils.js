import Grid from '@mui/material/Grid'

import { useState, useEffect } from 'react'
import { Box } from '@mui/material'

export function renderOrNot (v, jsx) {
  if (!v) { return null }
  return jsx
}

export function twoColJsx (obj1, obj2) {
  const props1 = obj1.compAttr || {}
  const props2 = obj2.compAttr || {}
  return (
    <Grid container columnSpacing={{ xs: 0, sm: 1, lg: 2 }} >
      <Grid item xs={12} md={6}>
        {obj1.comp
          ? <obj1.comp { ...props1 }>{ obj1.text }</obj1.comp>
          : obj1.text }
      </Grid>
      <Grid item xs={12} md={6}>
        {obj2.comp
          ? <obj2.comp { ...props2 }>{ obj2.text }</obj2.comp>
          : obj2.text }

      </Grid>
    </Grid>
  )
}

export function LeftRight (props) {
  const { children } = props
  if (!children || children.length !== 2) {
    console.error('LeftRight should have exactly 2 children')
    return null
  }
  return (
    <Grid container
          columnSpacing={{ xs: 0, sm: 1, lg: 2 }}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
    >
      <Grid item xs={12} md={6}>
        {children[0]}
      </Grid>
      <Grid item xs={12} md={6}>
        {children[1]}
      </Grid>
    </Grid>
  )
}

export function CollapsableLayout (props) {
  const { children, description } = props
  if (!children || children.length === 0) {
    console.log('CollapsableLayour should contain a child')
    return null
  }
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div>
      <span style={{ marginRight: '4px' }}>{description}</span>
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        >>
      </button>

      <div
        style={{
          height: isCollapsed ? 0 : 'auto',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function HorizontalDivs (props) {
  const { children } = props
  if (!children || children.length === 0) {
    console.log('CollapsableLayour should contain a child')
    return null
  }
  return (
    <div style={{
      display: 'flex'
    }}>
        {children}
    </div>
  )
}
