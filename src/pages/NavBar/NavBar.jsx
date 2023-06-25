import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "mui-image";
import Logo from "@/assets/images/Avicenne-logo.png";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
const pages = [
  { label: "Products", to: "/avicenne/products" },
  { label: "About Us", to: "/avicenne/#AboutUs" },
  { label: "Contact Us", to: "/avicenne/#ContactUs" },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#FEF5F0",
        boxShadow: "none",
        color: "#111111",
      }}
      sx={{
        paddingX: { xs: "0px", sm: "10px", lg: "50px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "space-between",
            },
          }}
        >
          <Image
            src={Logo}
            height="75px"
            width="200px"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/avicenne/");
            }}
          />

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", sm: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link style={{ textDecoration: "none" }} to={page.to} key={page.label}>
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography color="#111111" textAlign="center">
                      {page.label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "flex" },
            }}
          >
            {pages.map((page) => (
              <Link style={{ textDecoration: "none" }} to={page.to} key={page.label}>
                <Button
                  
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#111111",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
