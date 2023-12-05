import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { productServiceType } from '../../types/types';

const ProductForm = (props: {
  open: boolean;
  onSave: any;
  product: productServiceType;
}) => {
  const [open, setOpen] = useState(props.open);
  const [product, setProduct] = useState(props.product);

  const handleChange = (e) => {
    setProduct((D) => ({ ...D, [e.target.id]: e.target.value }));
  };

  const handleClose = () => {
    props.onSave(product);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit: {product.name}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={product.name}
            required
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={product.description}
            required
            multiline
            maxRows={7}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={product.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductForm;
