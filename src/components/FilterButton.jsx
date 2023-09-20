import React from "react";

import Fab from "@mui/material/Fab";
import FilterListIcon from "@mui/icons-material/FilterList";
const FilterButton = ({handleOpen}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 9999,
      }}
      className="block lg:hidden "
    >
      <Fab onClick={handleOpen}>
        <FilterListIcon />
      </Fab>
    </div>
  );
};

export default FilterButton;
