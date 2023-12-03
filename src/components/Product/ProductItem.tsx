import { useState } from 'react';
import { Grid, Card, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import fcLogo from '../../assets/filip_club_logo.png';
import { hasUserAdminRole } from '../../lib/util';
import useAuthContext from '../../features/Auth/authContext';
import { productServiceType } from '../../types/types';

const ProductItem = (props: { product: productServiceType; onEdit: any }) => {
  const [product, setProduct] = useState(props.product);
  const [accessToken, setAccessToken] = useAuthContext();

  const handleOnEdit = () => {
    props.onEdit(product.productId);
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
          {hasUserAdminRole(accessToken) && (
            <Button size="small" variant="outlined" onClick={handleOnEdit}>
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
