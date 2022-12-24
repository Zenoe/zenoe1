import Grid from '@mui/material/Grid'

export function renderOrNot (v, jsx) {
  if (!v) { return null }
  return jsx
}

export function twoColJsx (obj1, obj2) {
  const props1 = obj1.compAttr || {}
  return (
    <Grid container columnSpacing={{ xs: 0, sm: 1, lg: 2 }} >
      <Grid item xs={12} md={6}>
        {obj1.comp
          ? <obj1.comp { ...props1 }>{ obj1.text }</obj1.comp>
          : obj1.text }
      </Grid>
      <Grid item xs={12} md={6}>
        {obj2.comp
          ? <obj2.comp>{ obj2.text }</obj2.comp>
          : obj2.text }

      </Grid>
    </Grid>
  )
}
