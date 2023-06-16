import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "mui-image";
import "./HeroSection.css";
import HoneyJar from "@/assets/images/jar-with-fresh-honey.jpg";
function HeroSection() {
  const navigate = useNavigate();

  const signUpClickHandle = () => {
    navigate("/SignUp");
  };
  const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    if (windowWidth >= 900) return { height: 450, width: 450 };
    else if (windowWidth < 900 && windowWidth > 600)
      return { height: 350, width: 350 };
    else if (windowWidth <= 600) return { height: 200, width: 200 };
  };

  const size = useWindowWidth();
  return (
    <Grid
      container
      className="HeroSectionContainer"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid
        container
        className="HeroSection"
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid className="HeroContent" order={{ xs: 2, sm: 2, md: 1 }}>
          <Grid>
            <h1>Choose a Better You</h1>
            <hr color="orange"></hr>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              repellendus corporis, itaque eligendi eum perferendis ratione
              accusamus. Soluta, possimus modi voluptatibus optio, dolor nulla
              nam ipsam saepe eum error eos!
            </p>
          </Grid>
        </Grid>
        <Grid
          className="HeroImage"
          order={{ xs: 1, sm: 1, md: 2 }}
          //style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img
            height={size.height}
            width={size.width}
            src={HoneyJar}
            style={{ borderRadius: "38% 62% 70% 30% / 46% 45% 55% 54% " }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className="HeroFooter"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#3d3d3d", padding: "10px" }}
      >
        <Typography color="white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aperiam
          voluptates quo blanditiis vel accusantium, iste neque facere.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HeroSection;
