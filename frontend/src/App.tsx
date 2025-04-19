import { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
// import Map from "./components/Map";
import type { GridMixEntry } from "./types/gridMix";
import BalancingAuthSelector from "./components/BalancingAuthSelector";
import GridMixViewer from "./components/GridMixViewer";

const App: React.FC = () => {
  const [selectedBA, setSelectedBA] = useState<string>("");
  const [gridMixData, setGridMixData] = useState<GridMixEntry[]>([]);
  const [loadingGridMix, setLoadingGridMix] = useState(false);
  const [gridMixError, setGridMixError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedBA) return;

    const fetchGridMix = async () => {
      setLoadingGridMix(true);

      try {
        const response = await fetch(
          `/api/grid-mix?balancing_authority=${selectedBA}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch grid mix data");
        }

        const data: GridMixEntry[] = await response.json();
        setGridMixData(data);
      } catch (error) {
        console.error("Error fetching grid mix data:", error);
        setGridMixError("Failed to load grid mix data");
        setGridMixData([]);
      } finally {
        setLoadingGridMix(false);
      }
    };

    fetchGridMix();
  }, [selectedBA]);

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
        <GridMixViewer
          data={gridMixData}
          loading={loadingGridMix}
          error={gridMixError}
          selectedBA={selectedBA}
        />
        {/* <Map /> */}
      </Box>
    </Container>
  );
};

export default App;
