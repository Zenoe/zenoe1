import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Container,
  Paper,
  Button,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyNotes (){
  return (
    <Container maxWidth="xl">
      <Box>
        <Button>Create New Note</Button>
        <Stack spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Box>
    </Container>
  )
}
