import React from "react";
import { Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
const Footer = () => {
  return (
    <Grid
      id="ContactUs"
      container
      className="Footer"
      direction={{ xs: "column", sm: "column", md: "row" }}
      justifyContent={{ xs: "start", sm: "start", md: "space-between" }}
      alignItems={{ xs: "start", sm: "center", md: "center" }}
      marginTop="auto"
      gap="75px"
      flexWrap="nowrap"
      sx={{
        backgroundColor: "#3d3d3d",
        color: "white",
      }}
      paddingY={{ xs: "10px", sm: "10px", md: "50px" }}
      paddingX={{ xs: "25px", sm: "25px", md: "100px" }}
    >
      <Grid
        className="FooterLeft"
        container
        sx={{ maxWidth: "380px" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        gap="25px"
      >
        <h1 className=" text-3xl font-bold">Choose a Better You</h1>
        <hr color="#D78C12" className="w-full h-1 border-none"></hr>
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
        maxWidth={{ xs: "200px", sm: "380px", md: "200px" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        gap="25px"
      >
        <h1 className=" text-3xl font-bold">Contact Us</h1>
        <hr color="#D78C12" className="w-full h-1 border-none"></hr>
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
