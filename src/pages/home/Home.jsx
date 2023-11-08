import React, { useState,useEffect } from 'react'
import { fetchRecentPhotos } from '../../middleware/api';
import { Grid } from '@mantine/core';

const Home = () => {
    const [recentPhotos, setRecentPhotos] = useState([]);

    useEffect(() => {
      async function loadRecentPhotos() {
        try {
          const photos = await fetchRecentPhotos();
          setRecentPhotos(photos);
        } catch (error) {
          // Handle errors
        }
      }
  
      loadRecentPhotos();
    }, []);
  
    return (
      <div className="image-list">
        <Grid>
        <Grid.Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>
        {recentPhotos.map((photo) => (
          <img
            key={photo.id}
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            alt={photo.title}
          />
        ))}
        </Grid.Col>
        </Grid>
      
      </div>
    );
  }
export default Home