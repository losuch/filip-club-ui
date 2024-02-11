import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const NewFilmButton = (props: any) => {
  const handlerOnClick = () => {
    props.onClick();
  };
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card
        sx={{
          //   paddingTop: 2,
          //   paddingBottom: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button onClick={handlerOnClick}>
          <CardContent sx={{ flexGrow: 1, display: 'contents' }}>
            <AddIcon sx={{ fontSize: 150, alignSelf: 'center' }} />
          </CardContent>
        </Button>
      </Card>
    </Grid>
  );
};

export default NewFilmButton;
