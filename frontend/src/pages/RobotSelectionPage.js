import { Button, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const robots = [
  { name: "UR5e", image: "/images/ur5e.jpg", description: "Lightweight, versatile robot", link: "/robots/ur5e" },
];

export default function RobotSelectionPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select a Robot</h1>
      <Grid container spacing={3}>
        {robots.map((robot) => (
          <Grid item xs={12} sm={4} key={robot.name}>
            <Card>
              <CardMedia component="img" height="200" image={robot.image} alt={robot.name} />
              <CardContent>
                <Typography variant="h5">{robot.name}</Typography>
                <Typography variant="body2">{robot.description}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(robot.link)}
                  style={{ marginTop: "10px" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
