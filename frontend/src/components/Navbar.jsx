import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useScrollTrigger,
  Slide
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AccountCircle, Work } from '@mui/icons-material'

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    logout()
    navigate('/')
  }

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                <Work />
              </Avatar>
              <Typography 
                variant="h5" 
                component={Link} 
                to="/" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #B75D3F 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                LINX
              </Typography>
            </Box>

            {/* Navigation Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                component={Link} 
                to="/jobs" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                Browse Jobs
              </Button>
              
              {!user ? (
                <>
                  <Button 
                    component={Link} 
                    to="/signin" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 500,
                      px: 2
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    component={Link} 
                    to="/signup" 
                    variant="contained"
                    sx={{ 
                      ml: 1,
                      px: 3,
                      fontWeight: 600
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  {user.role === 'employer' && (
                    <Button 
                      component={Link} 
                      to="/employer/post" 
                      variant="contained"
                      color="secondary"
                      sx={{ 
                        mr: 2,
                        px: 3,
                        fontWeight: 600
                      }}
                    >
                      Post Job
                    </Button>
                  )}
                  
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36,
                        bgcolor: 'secondary.main',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {user.name?.[0] || user.username?.[0] || 'U'}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {user.name || user.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    
                    {user.role === 'user' && (
                      <MenuItem 
                        component={Link} 
                        to="/user/dashboard"
                        onClick={handleClose}
                      >
                        Dashboard
                      </MenuItem>
                    )}
                    {user.role === 'employer' && (
                      <MenuItem 
                        component={Link} 
                        to="/employer/dashboard"
                        onClick={handleClose}
                      >
                        Employer Panel
                      </MenuItem>
                    )}
                    {(user.role === 'dev' || user.role === 'admin') && (
                      <MenuItem 
                        component={Link} 
                        to="/dev/dashboard"
                        onClick={handleClose}
                      >
                        Admin Panel
                      </MenuItem>
                    )}
                    
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  )
}

              </Button>
            </>
          )}
          {user && (
            <>
              {user.role === 'user' && (
                <Button component={Link} to="/user/dashboard" color="inherit">
                  Dashboard
                </Button>
              )}
              {user.role === 'employer' && (
                <Button component={Link} to="/employer/dashboard" color="inherit">
                  Employer Panel
                </Button>
              )}
              {(user.role === 'dev' || user.role === 'admin') && (
                <Button component={Link} to="/dev/dashboard" color="inherit">
                  Admin Panel
                </Button>
              )}
              <Button onClick={handleLogout} color="secondary" variant="outlined">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}