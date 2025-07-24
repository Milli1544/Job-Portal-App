import React from 'react'
import { Grid, Box } from '@mui/material'

const BentoGrid = ({ children, spacing = 3, ...props }) => {
  return (
    <Box sx={{ width: '100%', ...props.sx }}>
      <Grid container spacing={spacing} {...props}>
        {children}
      </Grid>
    </Box>
  )
}

const BentoItem = ({ 
  children, 
  xs = 12, 
  sm, 
  md, 
  lg, 
  xl, 
  height = 'auto',
  minHeight,
  ...props 
}) => {
  return (
    <Grid 
      item 
      xs={xs} 
      sm={sm} 
      md={md} 
      lg={lg} 
      xl={xl}
      sx={{
        height,
        minHeight,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Grid>
  )
}

export { BentoGrid, BentoItem }