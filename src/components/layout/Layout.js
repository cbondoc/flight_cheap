import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Link,
  Typography,
  Toolbar,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  Button,
  AppBar,
} from "@mui/material";
import Image from "next/image";
import { LocalAirport, Lock } from "@mui/icons-material";

const exclude_pathname = ["access/logout", "access/login", "about_us"];

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
function Layout(props) {
  const FlightCheapLogoOnlyTransparent = "/FlightCheapLogoOnlyTransparent.png";

  const [isLogin, setLogin] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLogin(true);
    }
  }, [setLogin]); // Add setLogin as a dependency

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="transparent">
        <Toolbar sx={{ flexWrap: "wrap", width: '70%', alignSelf: 'center'}}>
          <LocalAirport />
          <Link
            variant="button"
            color="inherit"
            href="/"
            sx={{ my: 1, mx: 1.5, textDecoration: "none", flexGrow: 1 }}
          >
            <Typography variant="h6" color="inherit" noWrap sx={{textTransform: 'capitalize', fontWeight: 600}}>
              FlightCheap
            </Typography>
          </Link>
          <nav>
            <Link
              variant="button"
              color="inherit"
              href="/bookings"
              sx={{ my: 1, mx: 1.5, textDecoration: "none", textTransform: 'capitalize', fontWeight: 600 }}
            >
              Bookings
            </Link>
            <Link
              variant="button"
              color="inherit"
              href="/contact-us"
              sx={{ my: 1, mx: 1.5, textDecoration: "none", textTransform: 'capitalize', fontWeight: 600 }}
            >
              Contact Us
            </Link>
            <Link
              variant="button"
              color="inherit"
              href="/about_us"
              sx={{ my: 1, mx: 1.5, textDecoration: "none", textTransform: 'capitalize', fontWeight: 600 }}
            >
              About Us
            </Link>

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <AccountCircleRoundedIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

          </nav>
        </Toolbar>
      </AppBar>
      {isLogin ? (
        <>
          <main>{props.children}</main>
        </>
      ) : (
        <>
          <Link color="inherit" href="/access/login">
            Sign in
          </Link>
        </>
      )}

      {/* Footer */}
      <Box
        display="flex"
        sx={{ bgcolor: "#c5e1ec" }}
        justifyContent="center"
        alignItems="center"
        pt={4}
      >
        <Image
          src={FlightCheapLogoOnlyTransparent}
          alt="Cheap Flight Logo"
          width={50}
          height={50}
        />
      </Box>

      <Box
        sx={{ bgcolor: "#c5e1ec" }}
        component="footer"
        alignContent="flex-start"
        alignItems="flex-start"
        justify="flex-start"
      >
        <Typography variant="h6" align="center" gutterBottom>
          FlightCheap
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Cheapest Flight Fare Finder
        </Typography>
        <Copyright />
      </Box>
      {/* End Footer */}
    </ThemeProvider>
  );
}

export default Layout;
