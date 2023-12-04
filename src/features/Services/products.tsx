import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductForm from '../../components/Product/ProductForm';
import ProductItem from '../../components/Product/ProductItem';
import { fetchProducts } from '../../lib/filipclubApi';
import { productServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';

const Products = () => {
  const [products, setProducts] = useState(Array<productServiceType>());
  const [accessToken, setAccessToken] = useAuthContext();
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({
    productId: 0,
    name: '',
    description: '',
    price: 0,
  });

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

  const handleOnEdit = (p: productServiceType) => {
    setEditProduct(p);
    setOpenEdit(true);
  };

  const handleOnSave = () => {
    setEditProduct({
      productId: 0,
      name: '',
      description: '',
      price: 0,
    });
    setOpenEdit(false);
  };

  return (
    <Layout>
      <div>
        {openEdit && (
          <ProductForm
            key={editProduct.productId}
            open={openEdit}
            onSave={handleOnSave}
            product={editProduct}
          />
        )}
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
              <React.Fragment key={product.productId}>
                <ProductItem
                  product={product}
                  key={product.productId}
                  onEdit={handleOnEdit}
                />
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default Products;
