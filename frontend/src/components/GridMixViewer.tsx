import { Alert, CircularProgress, Paper, Typography } from "@mui/material";
import type { GridMixEntry } from "../types/gridMix";

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
  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Grid Mix Data (Raw View)
      </Typography>
      <pre style={{ maxHeight: 300, overflow: "auto", textAlign: "left" }}>
        {JSON.stringify(data.slice(0, 20), null, 2)}
      </pre>
    </Paper>
  );
};

export default GridMixViewer;
