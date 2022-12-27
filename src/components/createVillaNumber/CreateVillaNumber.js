import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api/Api';
import PopupModal from '../common/PopupModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FormControl } from '@material-ui/core';
import { SelectChangeEvent } from '@mui/material/Select';

function CreateVillaNumber() {
  const [villa, setVilla] = useState([]);
  const [villaNumber, setVillaNumber] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
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

    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [selectedVilla, setSelectedVilla] = React.useState('');

  useEffect(() => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.getAllVillaNumber)
      .fetch()
      .then((res) => {
        setVillaNumber(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    alert('save called from vn');
  };

  const handleChange = (event) => {
    setSelectedVilla(event.target.value);
  };
  function CreateVillaNumberForm() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='selectVillaLabel'>Select Villa</InputLabel>
              <Select
                labelId='selectVillaLabel'
                id='selectVilla'
                value={selectedVilla}
                label='Age'
                onChange={handleChange}
              >
                {villa.map((vn, i) => (
                  <MenuItem key={i} value={vn.id}>
                    {vn.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor='villaNo'>Villa Number</InputLabel>
            <OutlinedInput
              type='number  '
              id='villaNo'
              label='Villa Number'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor='specialDetails'>Villa Details</InputLabel>
            <OutlinedInput
              id='specialDetails'
              label='Special Details'
              fullWidth
            />
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
            title='Create Villa number'
            handleSave={handleSave}
          >
            {CreateVillaNumberForm()}
          </PopupModal>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Villa No</TableCell>
                <TableCell align='right'>Special Details</TableCell>
                <TableCell colSpan={2} align='right'>
                  <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                  >
                    Add Villa Number
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {villaNumber.map((v, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row'>
                    {v.villa.name}
                  </TableCell>
                  <TableCell align='right'>{v.villaNo}</TableCell>
                  <TableCell align='right'>{v.specialDetails}</TableCell>

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

export default CreateVillaNumber;
