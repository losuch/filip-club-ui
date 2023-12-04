import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { productServiceType } from '../../types/types';
import { Padding } from '@mui/icons-material';

const ProductForm = (props: {
  open: boolean;
  onSave: any;
  product: productServiceType;
}) => {
  const [open, setOpen] = useState(props.open);
  const [product, setProduct] = useState(props.product);

  const handleClose = () => {
    props.onSave();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit: {product.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={product.name}
            required
            sx={{ marginBottom: 5 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={product.description}
            required
            multiline
            sx={{ marginBottom: 5 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={product.price}
            sx={{ marginBottom: 5 }}
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
