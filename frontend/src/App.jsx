import { Typography, Container } from "@mui/material";

function App() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Electricity Demand and Generation
      </Typography>
    </Container>
  );
}

export default App;
