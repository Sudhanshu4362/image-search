import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const apiKey = import.meta.env.VITE_APP_FLICKR_API_KEY;
import { Grid } from '@mantine/core';


// import classes from "./imageSearch.module.css"
const SearchContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.flickr.com/services/rest/",
          {
            params: {
              method: "flickr.photos.search",
              api_key: apiKey,
              text: query,
              format: "json",
              nojsoncallback: 1,
            },
          }
        );

        setImages(response.data.photos.photo);
        setShowPhotos(true);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (query) {
      fetchImages();
    } else {
      setImages([]);
      setShowPhotos(false);
    }
  }, [query]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <SearchContainer>
      <input
        placeholder="Search Photos"
        mt="md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{width:"80%", fontSize:"2rem"}}
      />
      <button
        type="submit"
        variant="filled"
        color="rgba(0, 0, 0, 1)"
        size="md"
        
        style={{ margin: "0.5rem" ,width:"20%", fontSize:"3rem" }}
        onClick={() => setQuery(query)}
      >
        Search
      </button>
      <div>
      <Grid>
        <Grid.Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>
        {showPhotos &&
          images.map((image) => (
            <img
              key={image.id}
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              alt={image.title}
              onClick={() => openImageModal(image)}
            />
          ))}
          </Grid.Col>
        </Grid>
      </div>
      {selectedImage && (
        <Modal
          opened={selectedImage !== null}
          onClose={closeImageModal}
          size="md"
          padding="xs"
          title={selectedImage.title}
        >
          <img
            src={`https://farm${selectedImage.farm}.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}.jpg`}
            alt={selectedImage.title}
          />
        </Modal>
      )}
    </SearchContainer>

  );
};

export default ImageSearch;
