import { Grid, Skeleton } from "@mui/material";

function DashboardSkeleton() {
  return (
    <Grid container spacing={3}>
      {[1,2,3,4].map((item) => (
        <Grid item xs={12} md={3} key={item}>
          <Skeleton
            variant="rounded"
            height={120}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardSkeleton;