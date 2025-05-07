import { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TableSortLabel,
  Box,
} from "@mui/material";
import type { GridMixEntry } from "../types/gridMix";

type Props = {
  data: GridMixEntry[];
};

const headerCellStyle = (theme) => ({
  fontWeight: "bold",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[900] : "#f9f9f9",
  color: theme.palette.text.primary,
  borderBottom: "2px solid",
  borderColor: theme.palette.divider,
  padding: "8px 16px",
});

const cellStyle = {
  padding: "8px 16px",
  whiteSpace: "nowrap",
  borderBottom: "1px solid #eee",
};

const GridMixTable: React.FC<Props> = ({ data }) => {
  const [orderBy, setOrderBy] = useState<keyof GridMixEntry>("timestamp");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (property: keyof GridMixEntry) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [data, order, orderBy]);

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
              <TableCell
                sortDirection={orderBy === "timestamp" ? order : false}
                sx={(theme) => ({ ...headerCellStyle(theme), pr: 4 })}
              >
                <Box display="flex" alignItems="center">
                  <TableSortLabel
                    active={orderBy === "timestamp"}
                    direction={orderBy === "timestamp" ? order : "asc"}
                    onClick={() => handleSort("timestamp")}
                  >
                    Date
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "type-name" ? order : false}
                sx={(theme) => ({ ...headerCellStyle(theme), pr: 4 })}
              >
                <Box display="flex" alignItems="center">
                  <TableSortLabel
                    active={orderBy === "type-name"}
                    direction={orderBy === "type-name" ? order : "asc"}
                    onClick={() => handleSort("type-name")}
                  >
                    Fuel Type
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "Generation (MWh)" ? order : false}
                sx={(theme) => ({ ...headerCellStyle(theme), pr: 4 })}
              >
                <Box display="flex" alignItems="center">
                  <TableSortLabel
                    active={orderBy === "Generation (MWh)"}
                    direction={orderBy === "Generation (MWh)" ? order : "asc"}
                    onClick={() => handleSort("Generation (MWh)")}
                  >
                    Generation (MWh)
                  </TableSortLabel>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={cellStyle}>
                  {new Date(row.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell sx={cellStyle}>{row["type-name"]}</TableCell>
                <TableCell sx={cellStyle}>
                  {row["Generation (MWh)"].toLocaleString()}
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
