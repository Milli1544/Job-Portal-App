import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Chip,
  Stack,
  Typography,
  IconButton,
  Collapse
} from '@mui/material'
import {
  Search,
  LocationOn,
  FilterList,
  Clear,
  TuneOutlined
} from '@mui/icons-material'

const SearchHeader = ({ onSearch, onFilterChange, activeFilters = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    onSearch?.({ searchTerm, location })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearFilter = (filterKey) => {
    onFilterChange?.(filterKey, null)
  }

  const popularSearches = ['Frontend Developer', 'Data Analyst', 'Product Manager', 'UX Designer']

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        color: 'white',
        borderRadius: 3
      }}
    >
      {/* Main search bar */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Find Your Dream Job
        </Typography>
        
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
          <TextField
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
            sx={{
              flex: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'transparent'
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main'
                }
              }
            }}
          />
          
          <TextField
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'transparent'
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main'
                }
              }
            }}
          />
          
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            sx={{ 
              px: 4,
              py: 1.5,
              fontWeight: 600,
              minWidth: 120
            }}
          >
            Search Jobs
          </Button>
          
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{ 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <TuneOutlined />
          </IconButton>
        </Stack>
      </Box>

      {/* Popular searches */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
          Popular searches:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {popularSearches.map((search) => (
            <Chip
              key={search}
              label={search}
              clickable
              size="small"
              onClick={() => {
                setSearchTerm(search)
                onSearch?.({ searchTerm: search, location })
              }}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
            Active filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={`${filter.label}: ${filter.value}`}
                onDelete={() => clearFilter(filter.key)}
                deleteIcon={<Clear sx={{ color: 'white !important' }} />}
                size="small"
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Advanced filters */}
      <Collapse in={showFilters}>
        <Box sx={{ mt: 3, p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Advanced Filters
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              select
              label="Job Type"
              size="small"
              sx={{ minWidth: 150 }}
              SelectProps={{ native: true }}
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </TextField>
            
            <TextField
              select
              label="Experience Level"
              size="small"
              sx={{ minWidth: 150 }}
              SelectProps={{ native: true }}
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="executive">Executive</option>
            </TextField>
            
            <TextField
              select
              label="Salary Range"
              size="small"
              sx={{ minWidth: 150 }}
              SelectProps={{ native: true }}
            >
              <option value="">Any Salary</option>
              <option value="0-50k">$0 - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value="100k-150k">$100k - $150k</option>
              <option value="150k+">$150k+</option>
            </TextField>
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default SearchHeader