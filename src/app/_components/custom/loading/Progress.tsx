import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <Box sx={{ alignSelf: "flex-start", width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
