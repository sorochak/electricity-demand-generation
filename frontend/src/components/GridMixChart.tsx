import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

interface GridDataPoint {
  date: string | Date; // Can pass in ISO string or Date object
  type_name: string;
  generation_mwh: number;
}

interface Props {
  data: GridDataPoint[];
}

const fuelLegend = [
  { label: "Coal", color: "#d62728" },
  { label: "Natural Gas", color: "#ff7f0e" },
  { label: "Nuclear", color: "#2ca02c" },
  { label: "Petroleum", color: "#8c564b" },
  { label: "Other", color: "#7f7f7f" },
  { label: "Solar", color: "#e377c2" },
  { label: "Hydro", color: "#9467bd" },
  { label: "Wind", color: "#1f77b4" },
];

const GridMixChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data.length) return;

    // Parse date strings if needed

    const fuelTypes = [...new Set(data.map((d) => d.type_name))];
    console.log("⚡ Unique fuel types in raw data:", fuelTypes);
    const parsedData = data.map((d) => ({
      ...d,
      date: typeof d.date === "string" ? new Date(d.date) : d.date,
    }));

    const plot = Plot.plot({
      width: 800,
      height: 400,
      marginLeft: 60,
      x: {
        label: "Date",
        tickFormat: (d) =>
          d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),

        ticks: 12,
      },
      y: {
        label: "Generation (MWh)",
        grid: true,
      },
      color: {
        type: "categorical",
        legend: false,
        label: "Fuel Type",
        domain: fuelLegend.map((f) => f.label),
        range: fuelLegend.map((f) => f.color),
      },
      marks: [
        Plot.lineY(parsedData, {
          x: "date",
          y: "generation_mwh",
          stroke: "type_name",
          curve: "monotone-x",
          strokeWidth: 2,
          strokeOpacity: 0.9,
        }),
        Plot.ruleY([0], { stroke: "#666", strokeOpacity: 0.5 }),
      ],
    });

    chartRef.current?.appendChild(plot);

    console.log("parsedData sample:", parsedData.slice(0, 10));

    return () => {
      plot.remove();
    };
  }, [data]);

  return (
    <Card variant="outlined" sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Generation Trends by Fuel Type
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 4,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          <Box sx={{ flex: "1 1 600px", minWidth: "300px" }}>
            <Box ref={chartRef} sx={{ overflowX: "auto" }} />
          </Box>

          <Box
            sx={{
              flex: "0 1 200px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {fuelLegend.map(({ label, color }) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    bgcolor: color,
                    borderRadius: 0.5,
                  }}
                />
                <Typography variant="body2" color="text.primary">
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GridMixChart;
