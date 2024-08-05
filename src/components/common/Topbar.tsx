import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

const Topbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Typography
          variant='h5'
          component='div'
          sx={{ flexGrow: 1 }}
          textAlign={"center"}
          fontWeight={500}
        >
          Star Wars Dashboard
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Topbar;
