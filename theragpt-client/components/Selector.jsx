import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Dashboard from "./Dashboard";
import MenuPopup from "./MenuPopup";
import MenuPopupState from "./MenuPopup";

export default function Selector({ setUser, setAuthState, user }) {
  return (
    <div>
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "97%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
              width: "40vw",
              backgroundColor: "#ddd",
              borderRadius: "1em",
              margin: "0em",
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
              width: "40vw",
              backgroundColor: "#ddd",
              borderRadius: "1em",
            }}
          >
            <Button onClick={() => setAuthState("dbt")}>
              <Typography variant="h4">DBT BOT</Typography>
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
