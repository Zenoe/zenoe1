import { Box } from '@mui/material'
export default function SpaceHolder ({ spacing }) {
  console.log(spacing)
  return (
    <Box m={spacing || 2}/>
  )
}
