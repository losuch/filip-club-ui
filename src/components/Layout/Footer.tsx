import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://filip-club.de/">
        filip-club.de
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Footer = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '50vh',
        }}
      > */}
      <CssBaseline />
      {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Sticky footer
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Pin a footer to the bottom of the viewport.'}
            {'The footer will move as the main element of the page grows.'}
          </Typography>
          <Typography variant="body1">Sticky footer placeholder.</Typography>
        </Container> */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
};

export default Footer;
