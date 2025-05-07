import { Alert, CircularProgress, Box } from "@mui/material";
import type { GridMixEntry } from "../types/gridMix";
import GridMixTable from "./GridMixTable";
import GridMixChart from "./GridMixChart";

type Props = {
  data: GridMixEntry[];
  loading: boolean;
  error: string | null;
  selectedBA: string;
};

const GridMixViewer: React.FC<Props> = ({
  data,
  loading,
  error,
  selectedBA,
}) => {
  if (loading) return <CircularProgress sx={{ mt: 2, mb: 2 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (selectedBA && data.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        No generation data available for the selected balancing authority.
      </Alert>
    );
  }

  // Transform data for the chart
  const chartData = data.map((entry) => ({
    date: new Date(entry.timestamp),
    type_name: entry["type-name"],
    generation_mwh: entry["Generation (MWh)"],
  }));

  return (
    <Box sx={{ mt: 4 }}>
      <GridMixChart data={chartData} />
      <GridMixTable data={data} />
    </Box>
  );
};

export default GridMixViewer;
