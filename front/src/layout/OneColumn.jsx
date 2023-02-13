
import {
  Box,
  Grid
} from '@mui/material'

import { renderOrNot } from '@/utils/uiutils'
export function OneColumn (props) {
  const { children, spacing } = props

  const gridItems = []
  for (const [idx, child] of children.entries()) {
    gridItems.push(
      <Grid key={idx} item xs={12}>
        {child}
      </Grid>
    )
  }
  return (
    <Grid container spacing={spacing || 2}>
      {gridItems}
    </Grid>
  )
}

export function OneColumnFormLabel (props) {
  const { children, spacing, labels } = props

  const gridItems = []
  for (const [idx, child] of children.entries()) {
    gridItems.push(
        <Grid key={labels[idx]} item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <label>{labels[idx]}</label>
          </Box>
        </Grid>
    )
    gridItems.push(
      <Grid key={idx} item xs={6}>
        {child}
      </Grid>

    )
  }
  return (
    <Grid container spacing={spacing || 2}>
      {gridItems}
    </Grid>
  )
}
