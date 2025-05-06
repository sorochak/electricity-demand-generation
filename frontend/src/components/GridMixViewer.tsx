import { Alert, CircularProgress } from "@mui/material";
import type { GridMixEntry } from "../types/gridMix";
import GridMixTable from "./GridMixTable";

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
  return <GridMixTable data={data} />;
};

export default GridMixViewer;
