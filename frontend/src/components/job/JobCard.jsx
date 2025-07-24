import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Stack,
  Divider
} from '@mui/material'
import {
  LocationOn,
  AccessTime,
  Bookmark,
  BookmarkBorder,
  Business
} from '@mui/icons-material'

const JobCard = ({ job, onSave, isSaved = false }) => {
  const handleSave = (e) => {
    e.stopPropagation()
    onSave?.(job._id)
  }

  const formatTimeAgo = (date) => {
    const now = new Date()
    const posted = new Date(date)
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          '& .job-card-actions': {
            opacity: 1
          }
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with company and save button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: 'primary.light',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              {job.postedBy?.company?.[0] || job.postedBy?.name?.[0] || 'C'}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {job.postedBy?.company || job.postedBy?.name || 'Company'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(job.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <IconButton 
            onClick={handleSave}
            className="job-card-actions"
            sx={{ 
              opacity: { xs: 1, md: 0 },
              transition: 'opacity 0.2s ease-in-out',
              color: isSaved ? 'secondary.main' : 'text.secondary'
            }}
          >
            {isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>

        {/* Job title */}
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1.5,
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {job.title}
        </Typography>

        {/* Job description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {job.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Job details */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {job.location || 'Remote'}
            </Typography>
          </Box>
          
          {job.category && (
            <Chip 
              label={job.category}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'secondary.main',
                color: 'secondary.main',
                fontWeight: 500
              }}
            />
          )}
        </Stack>

        {/* Action buttons */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip
            label="Apply Now"
            clickable
            color="primary"
            sx={{ 
              fontWeight: 600,
              px: 2,
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          />
          <Chip
            label="View Details"
            clickable
            variant="outlined"
            sx={{ 
              fontWeight: 500,
              borderColor: 'text.secondary',
              color: 'text.secondary'
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobCard