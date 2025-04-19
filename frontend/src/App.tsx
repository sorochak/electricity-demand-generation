import { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import Map from "./components/Map";
import BalancingAuthSelector from "./components/BalancingAuthSelector";

function App() {
  const [selectedBA, setSelectedBA] = useState<string>("");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        gap: 4,
        paddingTop: 4,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Electricity Demand and Generation
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BalancingAuthSelector
          selectedBA={selectedBA}
          onSelect={(ba) => setSelectedBA(ba)}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Map />
      </Box>
    </Container>
  );
}

export default App;
