import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductForm from '../../components/Product/ProductForm';
import ProductItem from '../../components/Product/ProductItem';
import {
  fetchProducts,
  updateProduct,
  createNewProduct,
} from '../../lib/filipclubApi';
import { productServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';
import NewProductButton from '../../components/Product/NewProductButton';
import { hasUserAdminRole } from '../../lib/util';

const Products = () => {
  const [products, setProducts] = useState(Array<productServiceType>());
  const [accessToken, setAccessToken] = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [productFormTitel, setProductFormTitel] = useState('');

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
    setProductFormTitel('Edit Product');
    setEditProduct(p);
    setOpenEdit(true);
  };

  const handleOnSaveProductForm = async (product: productServiceType) => {
    console.log(product);
    if (product.productId === 0) {
      // new product
      console.log('new product');
      const res = await createNewProduct(product, atob(accessToken));
    } else {
      // update product
      console.log('update product');
      const res = await updateProduct(product, atob(accessToken));
    }
    setOpenEdit(false);
    handlerFetchProducts();
  };

  const handleOnCancelProductForm = () => {
    setOpenEdit(false);
  };

  const handlerNewProductOnClick = () => {
    setProductFormTitel('New Product');
    setEditProduct({
      productId: 0,
      name: '',
      description: '',
      price: 0,
    });
    setOpenEdit(true);
  };

  return (
    <Layout>
      <div>
        {openEdit && (
          <ProductForm
            titel={productFormTitel}
            key={editProduct.productId}
            open={openEdit}
            onSave={handleOnSaveProductForm}
            onCancel={handleOnCancelProductForm}
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
