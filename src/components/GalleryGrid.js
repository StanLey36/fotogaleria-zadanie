import React, { useState, useEffect } from 'react';
import Card from './Card';
import './GalleryGrid.css';
import axios from 'axios';
import CreateItemCard from './CreateItemCard';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://api.programator.sk';

function GalleryGrid() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/gallery`);
      setGalleries(response.data.galleries);
      setError(''); // Clear error state on success
    } catch (error) {
      setError('Error fetching galleries');
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetGalleries();
  }, []);

  const handleOverlayDisplay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setCategoryName(''); // Clear category name on overlay close
    setError(''); // Clear error state on overlay close
  };

  const handleSubmit = async () => {
    if (categoryName !== '') {
      try {
        const response = await axios.post(`${BASE_URL}/gallery`, {
          name: categoryName,
        });
        setGalleries([...galleries, response.data]);
        setCategoryName('');
        setShowOverlay(false);
        setError(''); // Clear error state on success
      } catch (error) {
        setError('Error creating gallery');
        console.error('Error creating gallery:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="wrapper">
        <div className="create-info">
          <h1>Fotogaléria</h1>
          <p id="link-or-title">Kategórie</p>
        </div>
        <div className="grid-container">
          {galleries.map((gallery) => (
            <Link className="link-text" key={gallery.path} to={`/gallery/${gallery.path}`}>
              <Card myimage={gallery.path} mytitle={gallery.name} />
            </Link>
          ))}
          <CreateItemCard onClick={handleOverlayDisplay} />
        </div>
      </div>
      <div id="overlay" style={{ display: showOverlay ? 'block' : 'none' }}>
        <div className="card-l-design-width">
          <div className="form">
            <div className="title">
              <h3>Pridať kategóriu</h3>
              <p className="closeOverlay" style={{ cursor: 'pointer' }} onClick={handleCloseOverlay}>
                X
              </p>
            </div>
            <label className="input">
              <input
                className="input__field"
                id="categoryName"
                type="text"
                placeholder=" "
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <span className="input__label">Názov kategórie</span>
            </label>
            <button id="submitButton" type="submit" onClick={handleSubmit}>
              Pridať
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryGrid;
