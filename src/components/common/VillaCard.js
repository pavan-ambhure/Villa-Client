import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function VillaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={props.viewVillaFn}>
      <CardMedia sx={{ height: 140 }} image={props.image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary'>
              {props.details}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<PeopleAltIcon />} label={props.occupacy} />
          </Grid>
          <Grid item xs={6}>
            <Chip icon={<SquareFootIcon />} label={props.sqft} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions spacing={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Chip icon={<CurrencyRupeeIcon />} label={props.amount} />
          </Grid>
          <Grid item xs={6} alignItems='flex-end'>
            <Button
              align
              variant='contained'
              size='small'
              sx={{ width: '100%' }}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
