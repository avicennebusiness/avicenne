import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger, Zoom } from "@mui/material";
import React from "react";

const ScrollToTop = ({ cardRef }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: cardRef?.current, // Use optional chaining here
  });

  const scrollToTop = () => {
    if (cardRef?.current) {
      cardRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={scrollToTop}
        role="presentation"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9999,
        }}
      >
        <Fab aria-label="scroll-to-top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollToTop;
