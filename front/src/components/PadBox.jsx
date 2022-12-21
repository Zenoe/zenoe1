import { styled } from '@mui/material/styles'
import { Box } from '@mui/material/'

/* default flex */
const PadBox = styled(Box)(({ theme, space, display }) => ({
  padding: theme.spacing(space || 1),
  display: display || 'flex'
}))

export default PadBox
