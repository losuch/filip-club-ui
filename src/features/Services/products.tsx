import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductForm from '../../components/Product/ProductForm';
import ProductItem from '../../components/Product/ProductItem';
import { fetchProducts, updateProduct } from '../../lib/filipclubApi';
import { productServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';
import NewProductButton from '../../components/Product/NewProductButton';
import { hasUserAdminRole } from '../../lib/util';

const Products = () => {
  const [products, setProducts] = useState(Array<productServiceType>());
  const [accessToken, setAccessToken] = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(Array<productServiceType>());

  const handlerFetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetchProducts(atob(accessToken));
    if (res.error) {
      setLoading(false);
      return;
    }
    // setAccessToken(token);

    setProducts(res.products);
    setLoading(false);
  }, [accessToken]);
  useEffect(() => {
    //  setLoading(true);
    if (accessToken !== '') {
      handlerFetchProducts();
    }
  }, [accessToken, handlerFetchProducts]);

  const handleOnEdit = (p: productServiceType) => {
    setEditProduct(p);
    setOpenEdit(true);
  };

  const handleOnSave = async (product: productServiceType) => {
    setEditProduct([
      {
        productId: 0,
        name: '',
        description: '',
        price: 0,
      },
    ]);
    setOpenEdit(false);
    const res = await updateProduct(product, atob(accessToken));
    handlerFetchProducts();
  };

  const handlerNewProductOnClick = () => {};

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
        {!loading && (
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
              {hasUserAdminRole(accessToken) && (
                <NewProductButton onClick={handlerNewProductOnClick} />
              )}
            </Grid>
          </Container>
        )}
      </div>
    </Layout>
  );
};

export default Products;
