import React from 'react'
import { 
  Typography, 
  Button, 
  Container, 
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip
} from '@mui/material'
import { Link } from 'react-router-dom'
import { 
  Work, 
  Business, 
  TrendingUp, 
  LocationOn,
  Schedule,
  Star
} from '@mui/icons-material'
import { BentoGrid, BentoItem } from '../components/layout/BentoGrid'
import SearchHeader from '../components/search/SearchHeader'

export default function Home() {
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      posted: '2 days ago',
      featured: true
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateLab',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      posted: '1 day ago',
      featured: true
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80k - $100k',
      posted: '3 days ago',
      featured: true
    }
  ]

  const stats = [
    { label: 'Active Jobs', value: '12,500+', icon: Work },
    { label: 'Companies', value: '2,800+', icon: Business },
    { label: 'Success Rate', value: '94%', icon: TrendingUp }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
        <BentoGrid spacing={4}>
          {/* Main Hero Content */}
          <BentoItem xs={12} lg={8}>
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, mb: 4 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  mb: 3,
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #B75D3F 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700
                }}
              >
                Find Your Dream Job
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: 600, lineHeight: 1.4 }}
              >
                Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 4 }}
              >
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Get Started
                </Button>
                <Button 
                  component={Link} 
                  to="/jobs" 
                  variant="outlined" 
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Browse Jobs
                </Button>
              </Stack>
            </Box>
            
            {/* Search Component */}
            <SearchHeader />
          </BentoItem>

          {/* Stats Cards */}
          <BentoItem xs={12} lg={4}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {stats.map((stat, index) => (
                <Card key={index} sx={{ flex: 1 }}>
                  <CardContent sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 3
                  }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                      <stat.icon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </BentoItem>
        </BentoGrid>
      </Container>

      {/* Featured Jobs Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
            Featured Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hand-picked jobs from top companies looking for talented professionals
          </Typography>
        </Box>

        <BentoGrid spacing={3}>
          {featuredJobs.map((job) => (
            <BentoItem key={job.id} xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                {job.featured && (
                  <Chip
                    label="Featured"
                    color="secondary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                      fontWeight: 600
                    }}
                  />
                )}
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                      {job.company[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {job.company}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {job.posted}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {job.title}
                  </Typography>

                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {job.type} • {job.salary}
                    </Typography>
                  </Stack>

                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ fontWeight: 600 }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </BentoItem>
          ))}
        </BentoGrid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={Link}
            to="/jobs"
            variant="outlined"
            size="large"
            sx={{ px: 4 }}
          >
            View All Jobs
          </Button>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 8,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of professionals who found their dream jobs through LINX
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <Button 
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Create Account
            </Button>
            <Button 
              component={Link}
              to="/signin"
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}