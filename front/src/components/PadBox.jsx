import { styled } from '@mui/material/styles'
import { Box } from '@mui/material/'

const PadBox = styled(Box)(({ theme, space }) => ({
  padding: theme.spacing(space || 1)
}))

export default PadBox
