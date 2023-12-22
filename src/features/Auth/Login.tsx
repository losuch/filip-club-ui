import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoginInfo, getToken } from '../../lib/util';

import fcLogo from '../../assets/filip_club_logo.png';
import NotificationContext from '../../components/NotificationBanner/context';
import { fetchProducts, postSignin } from '../../lib/filipclubApi';
import useAuthContext from './authContext';

const Login = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useAuthContext();

  const handleChange = (e) => {
    if (e.target.name === 'activeFlag') {
      setData((D) => ({ ...D, [e.target.name]: e.target.checked }));
    } else {
      setData((D) => ({ ...D, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postSignin(data);

    if (res.error) {
      setAlert({
        message: res.message,
        open: true,
        error: true,
      });
      return;
    }

    await setLoginInfo(btoa(res.token), res.email);
    setAlert({
      message: 'Successfully LoggedIn',
      open: true,
      error: false,
    });
    // window.localStorage.setItem('token', btoa('Bearer ' + res.jwttoken));
    const token = getToken();
    setAccessToken(token);
    navigate('/products');
  };

  useEffect(() => {
    setLoading(true);
    onEnter();
  }, []);

  const onEnter = async () => {
    setLoading(true);
    const token = getToken();
    const res = await fetchProducts(atob(token));
    if (res.error) {
      setLoading(false);
      return;
    }
    setAccessToken(token);
    setTimeout(() => {
      setLoading(false);
      navigate('/products');
    }, 200);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!loading && (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={fcLogo} width={100} height={100} />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          {/* Sign in */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Login;
