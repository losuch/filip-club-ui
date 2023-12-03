import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { productServiceType } from '../../types/types';

const ProductForm = (props: { open: boolean; onSave: any }) => {
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    props.onSave();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet. Aut laborum repellendus eos consectetur
            sunt est eligendi nostrum ex fuga aspernatur aut libero quod id eius
            tempore sed molestias veritatis. Qui excepturi reiciendis eum
            commodi necessitatibus aut modi rerum qui ducimus sunt non dolorem
            ullam 33 dolores mollitia. In obcaecati rerum aut porro ratione aut
            iusto numquam non molestiae necessitatibus ut provident sint.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductForm;
