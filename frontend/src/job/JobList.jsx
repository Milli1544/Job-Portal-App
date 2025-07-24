import React, { useEffect, useState } from 'react'
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { BentoGrid, BentoItem } from '../components/layout/BentoGrid'
import JobCard from '../components/job/JobCard'
import SearchHeader from '../components/search/SearchHeader'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [filteredJobs, setFilteredJobs] = useState([])
  
  const jobsPerPage = 12

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        const jobsArray = Array.isArray(data) ? data : []
        setJobs(jobsArray)
        setFilteredJobs(jobsArray)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err)
        setJobs([])
        setFilteredJobs([])
        setLoading(false)
      })
  }, [])

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev)
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId)
      } else {
        newSaved.add(jobId)
      }
      return newSaved
    })
  }

  const handleSearch = ({ searchTerm, location }) => {
    let filtered = jobs
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.postedBy?.company?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (location) {
      filtered = filtered.filter(job => 
        job.location?.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    setFilteredJobs(filtered)
    setCurrentPage(1)
  }

  const handleSortChange = (event) => {
    const newSortBy = event.target.value
    setSortBy(newSortBy)
    
    let sorted = [...filteredJobs]
    switch (newSortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'title':
        sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        break
      case 'company':
        sorted.sort((a, b) => (a.postedBy?.company || '').localeCompare(b.postedBy?.company || ''))
        break
      default:
        break
    }
    
    setFilteredJobs(sorted)
    setCurrentPage(1)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading amazing opportunities...
        </Typography>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search Header */}
        <SearchHeader onSearch={handleSearch} />
        
        {/* Results Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {filteredJobs.length === jobs.length ? 'All Jobs' : 'Search Results'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
              {filteredJobs.length !== jobs.length && ` out of ${jobs.length} total`}
            </Typography>
          </Box>
          
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="title">Job Title</MenuItem>
              <MenuItem value="company">Company Name</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No jobs found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria or browse all available positions
            </Typography>
          </Box>
        ) : (
          <>
            <BentoGrid spacing={3}>
              {currentJobs.map((job) => (
                <BentoItem key={job._id || job.id} xs={12} md={6} lg={4}>
                  <JobCard
                    job={job}
                    onSave={handleSaveJob}
                    isSaved={savedJobs.has(job._id || job.id)}
                  />
                </BentoItem>
              ))}
            </BentoGrid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}

export default JobList