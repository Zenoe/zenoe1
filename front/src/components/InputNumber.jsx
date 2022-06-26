import { useState } from 'react';
import MuiInput from '@mui/material/Input';

export default function NumberComponent(props){

  const { numberValue, setNumberValue } = props

  const handleChange = (evt) => {
    setNumberValue(evt.target.value)
  }

  return (
    <MuiInput
      value={numberValue || 1}
      size="small"
      onChange={handleChange}
      inputProps={{
        step: 1,
        min: 1,
        max: 99,
        type: 'number',
      }}
    />
  )
}
