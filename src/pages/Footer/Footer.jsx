import React from "react";
import { Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
const Footer = () => {
  return (
    <Grid
      container
      className="Footer"
      direction={{ xs: "column", sm: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      marginTop="auto"
      gap="75px"
      flexWrap="nowrap"
      sx={{
        backgroundColor: "#3d3d3d",
        color: "white",
        paddingY: "50px",
        paddingX: "100px",
      }}
    >
      <Grid
        className="FooterLeft"
        container
        sx={{ maxWidth: "380px" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
      >
        <h1>Choose a Better You</h1>
        <hr color="orange" style={{ width: "100%" }}></hr>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          repellendus corporis, itaque eligendi eum perferendis ratione
          accusamus. Soluta, possimus modi voluptatibus optio, dolor nulla nam
          ipsam saepe eum error eos!
        </p>
      </Grid>
      <Grid
        className="FooterRight"
        container
        sx={{ maxWidth: "200px" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
      >
        <h1>Contact Us</h1>
        <hr color="orange" style={{ width: "100%" }}></hr>
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          flexWrap="nowrap"
          gap="15px"
        >
          <PhoneIcon />
          <p>+216 55436333</p>
        </Grid>
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          flexWrap="nowrap"
          gap="15px"
        >
          <FacebookIcon />
          <p>Espace Avicenne</p>
        </Grid>
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          flexWrap="nowrap"
          gap="15px"
        >
          <MailIcon />
          <p>avicennebusiness@gmail.com</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
