import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import type { GridMixEntry } from "../types/gridMix";

type Props = {
  data: GridMixEntry[];
};

const GridMixTable: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Generation by Fuel Type
        </Typography>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Generation (MWh)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(entry.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{entry["type-name"]}</TableCell>
                <TableCell>
                  {entry["Generation (MWh)"].toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: "block",
          textAlign: "right",
          color: "text.secondary",
        }}
      >
        {data.length.toLocaleString()} rows fetched
      </Typography>
    </Paper>
  );
};

export default GridMixTable;
