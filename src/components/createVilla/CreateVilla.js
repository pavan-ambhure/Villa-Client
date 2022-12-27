import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Paper, TableContainer } from '@material-ui/core';
import { createAPIEndpoint, ENDPOINTS } from '../../api/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopupModal from '../common/PopupModal';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PeopleIcon from '@mui/icons-material/People';
function CreateVilla() {
  const [villa, setVilla] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.getAllVilla)
      .fetch()
      .then((res) => {
        setVilla(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    alert('save called');
  };

  function CreateVillaForm() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel htmlFor='villaName'>Villa Name</InputLabel>
            <OutlinedInput id='villaName' label='Villa Name' fullWidth />
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor='villaUrl'>Image Url</InputLabel>
            <OutlinedInput id='villaUrl' label='Image URL' fullWidth />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor='villaRate'>Villa Rate</InputLabel>
            <OutlinedInput
              id='villaRate'
              label='Villa Rate'
              startAdornment={<CurrencyRupeeIcon fontSize='small' />}
              type='number'
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor='villaSqft'>Villa Sqft</InputLabel>
            <OutlinedInput
              id='villaSqft'
              label='Villa Sqft'
              startAdornment={<SquareFootIcon fontSize='small' />}
              type='number'
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor='villaOccu'>Villa Occupancy</InputLabel>
            <OutlinedInput
              type='number'
              id='villaOccu'
              label='Villa Occupancy'
              startAdornment={<PeopleIcon fontSize='small' />}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='villaSqft'>Villa Special Details</InputLabel>
            <OutlinedInput id='villaDetails' label='Villa Details' fullWidth />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container mt={2}>
        <Grid item>
          <PopupModal
            open={open}
            handleClose={handleClose}
            title='Create Villa'
            handleSave={handleSave}
          >
            {CreateVillaForm()}
          </PopupModal>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Details</TableCell>
                <TableCell align='right'>Rate</TableCell>
                <TableCell align='right'>Sqft</TableCell>
                <TableCell align='right'>Occupancy</TableCell>
                <TableCell align='right'>Image URL</TableCell>
                <TableCell align='right'>Aminities</TableCell>
                <TableCell colSpan={2} align='right'>
                  <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                  >
                    Add Villa
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {villa.map((v, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row'>
                    {v.name}
                  </TableCell>
                  <TableCell align='right'>
                    <span style={{ textOverflow: 'ellipsis' }}>
                      {v.details.length > 20
                        ? v.details.substring(0, 30) + '...'
                        : v.details}
                    </span>
                  </TableCell>
                  <TableCell align='right'>{v.rate}</TableCell>
                  <TableCell align='right'>{v.sqft}</TableCell>
                  <TableCell align='right'>{v.occupancy}</TableCell>
                  <TableCell align='right'>
                    <a href={v.imageUrl} target='_blank'>
                      View
                    </a>
                  </TableCell>
                  <TableCell align='right'>{v.aminities}</TableCell>
                  <TableCell align='right'>
                    <IconButton aria-label='delete'>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default CreateVilla;
