import { useEffect, useState } from "react";
import { Select, MenuItem, CircularProgress, Alert } from "@mui/material";

type Props = {
  selectedBA: string;
  onSelect: (ba: string) => void;
};

type BalancingAuthResponse = {
  balancing_authorities: string[];
};

const BalancingAuthSelector: React.FC<Props> = ({ selectedBA, onSelect }) => {
  const [balancingAuthorities, setBalancingAuthorities] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalancingAuthorities = async () => {
      try {
        const response = await fetch("/api/balancing-authorities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: BalancingAuthResponse = await response.json();
        setBalancingAuthorities(data.balancing_authorities);
      } catch (error) {
        console.error("Error fetching authorities:", error);
        setError("Failed to load balancing authorities");
      } finally {
        setLoading(false);
      }
    };

    fetchBalancingAuthorities();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Select
      value={selectedBA}
      onChange={(e) => onSelect(e.target.value)}
      displayEmpty
      sx={{ minWidth: 300 }}
    >
      <MenuItem value="">
        <em>Select a Balancing Authority</em>
      </MenuItem>
      {Array.isArray(balancingAuthorities) &&
      balancingAuthorities.length > 0 ? (
        balancingAuthorities.map((ba) => (
          <MenuItem key={ba} value={ba}>
            {ba}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No options available</MenuItem>
      )}
    </Select>
  );
};

export default BalancingAuthSelector;
