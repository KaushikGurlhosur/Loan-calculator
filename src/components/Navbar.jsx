import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Switch,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Exchange Rates (Live)", path: "/exchange-rates" },
    { name: "Error Page", path: "/error_page" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Loan Calculator
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}>
            Loan Calculator
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}>
                {item.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            {/* <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton> */}
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
