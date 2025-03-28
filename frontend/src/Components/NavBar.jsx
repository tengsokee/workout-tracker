import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'black', backgroundImage: 'unset'}}>
        <Toolbar>
          {user && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, color: 'white', cursor: 'pointer' }}
            onClick={() => navigate('/home')}
          >
            Tracker
          </Typography>

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: 'white' }}>
                {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            location.pathname !== '/login' && (
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
