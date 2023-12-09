import { Card, CardActions, CardContent, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import useAuthContext from '../../features/Auth/authContext';
import { hasUserAdminRole } from '../../lib/util';
import { productServiceType } from '../../types/types';

const ProductItem = (props: {
  product: productServiceType;
  onEdit: any;
  onDelete: any;
}) => {
  const [product, setProduct] = useState(props.product);
  const [accessToken, setAccessToken] = useAuthContext();

  const handleOnEdit = () => {
    props.onEdit(product);
  };

  const handleOnDelete = () => {
    props.onDelete(product.productId, product.name);
  };

  return (
    <Grid item key={product.productId} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <img src={fcLogo} /> */}
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
          {hasUserAdminRole(accessToken) && (
            <React.Fragment>
              <Button size="small" variant="contained" onClick={handleOnEdit}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleOnDelete}
              >
                Delete
              </Button>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
