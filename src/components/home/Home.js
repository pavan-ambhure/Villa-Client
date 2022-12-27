import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import logo from '../../images/villa1.jpg';
import VillaCard from '../common/VillaCard';
import { createAPIEndpoint, ENDPOINTS } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const [villa, setVilla] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <Grid container spacing={2}>
          <Grid mt={2} item xs={12}>
            <img src={logo} alt='Villa' width='100%' height='400' />
          </Grid>
          <Grid item xs={12}>
            <center>
              <Typography variant='h6'>My Villa's</Typography>
            </center>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {villa.length > 0 &&
                villa.map((v, i) => (
                  <Grid key={i} item xs={4} md={3}>
                    <VillaCard
                      image={v.imageUrl}
                      title={v.name}
                      details={v.details}
                      occupacy={v.occupancy + ' Person'}
                      sqft={v.sqft + ' sqft'}
                      amount={v.rate}
                      viewVillaFn={() => {
                        navigate(`/Home?id=${v.id}`);
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Home;
