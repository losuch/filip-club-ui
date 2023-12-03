import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import fcLogo from '../../assets/filip_club_logo.png';
import Layout from '../../components/Layout/Layout';
import { fetchProducts } from '../../lib/filipclubApi';
import { hasUserAdminRole } from '../../lib/util';
import { productServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';

const Products = () => {
  const [products, setProducts] = useState(Array<productServiceType>());
  const [adminRole, setAdminRole] = useState(false);
  const [accessToken, setAccessToken] = useAuthContext();

  const onEnter = async () => {
    // setLoading(true);
    const res = await fetchProducts(atob(accessToken));
    if (res.error) {
      // setLoading(false);
      return;
    }
    // setAccessToken(token);

    setProducts(res.products);
    // setLoading(false);
  };
  useEffect(() => {
    //  setLoading(true);
    if (accessToken !== '') {
      onEnter();
      setAdminRole(hasUserAdminRole(accessToken));
    }
  }, [accessToken]);

  return (
    <Layout>
      <div>
        <Typography
          variant="h6"
          sx={{
            mr: 2,

            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          PRODUCTS
        </Typography>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image=""
                  /> */}
                  <img src={fcLogo} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>{product.description}</Typography>
                    <Typography align="right" variant="h6">
                      € {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button> */}
                    {adminRole && <Button size="small">Edit</Button>}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default Products;
