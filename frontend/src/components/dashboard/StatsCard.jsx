import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat
} from '@mui/icons-material'

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  color = 'primary',
  progress,
  subtitle
}) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
      case 'negative':
        return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
      default:
        return <TrendingFlat sx={{ fontSize: 16, color: 'text.secondary' }} />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success.main'
      case 'negative':
        return 'error.main'
      default:
        return 'text.secondary'
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {Icon && (
            <Avatar 
              sx={{ 
                bgcolor: `${color}.light`,
                color: `${color}.main`,
                width: 56,
                height: 56
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Avatar>
          )}
        </Box>

        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            {getTrendIcon()}
            <Typography 
              variant="body2" 
              sx={{ 
                color: getChangeColor(),
                fontWeight: 500
              }}
            >
              {change}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              vs last period
            </Typography>
          </Box>
        )}

        {progress !== undefined && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: `${color}.main`
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard