import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Dashboard from "./Dashboard";

export default function Selector({ setAuthState }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          width: "80vw",
          backgroundColor: "#ddd",
          borderRadius: "1em",
          marginBottom: "2em",
        }}
      >
        <Button onClick={() => setAuthState("dashboard")}>
          <Typography variant="h4">Jung GPT</Typography>
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          width: "80vw",
          backgroundColor: "#ddd",
          borderRadius: "1em",
        }}
      >
        <Button onClick={() => setAuthState("dbt")}>
          <Typography variant="h4">DBT BOT</Typography>
        </Button>
      </Box>
    </Box>
  );
}
