import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductItem from '../../components/Product/ProductItem';
import { fetchProducts } from '../../lib/filipclubApi';
import { productServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';

const Products = () => {
  const [products, setProducts] = useState(Array<productServiceType>());
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
    }
  }, [accessToken]);

  const handleOnEdit = (id: number) => {
    console.log('open edit for productId:', id);
  };

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
          <Grid container spacing={4}>
            {products.map((product) => (
              <ProductItem
                product={product}
                key={product.productId}
                onEdit={handleOnEdit}
              />
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default Products;
