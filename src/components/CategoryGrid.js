import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import PhotoCard from './PhotoCard';
import axios from 'axios';
import CreateItemCard from './CreateItemCard';

const CategoryGrid = () => {
  const [displayOverlay, setDisplayOverlay] = useState("none");
  const [images, setImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [filesInfo, setFilesInfo] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathWithoutGallery = currentPath.replace(/^\//, '').replace(/^gallery\//, '');
    setGalleryTitle(pathWithoutGallery);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.programator.sk/gallery/${pathWithoutGallery}`);
        const data = response.data;

        const imageArray = data.images || [];
        setImages(imageArray);

        const totalImages = imageArray.length;

        console.log("Počet objektov:", totalImages);

        // Uložiť do localStorage
        localStorage.setItem(galleryTitle, totalImages);
      } catch (error) {
        console.error('Chyba pri načítavaní dát:', error);
      }
    };

    fetchData();
  }, [galleryTitle]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFilesInfo = Array.from(event.dataTransfer.files).map((file) => ({
      path: file.name,
      fullpath: `${galleryTitle}/${file.name}`,
      name: file.name.split(".")[0].charAt(0).toUpperCase() + file.name.split(".")[0].slice(1),
      modified: file.lastModifiedDate.toISOString(),
      file,
    }));
    setFilesInfo(newFilesInfo);
    console.log("Files info:", newFilesInfo);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    filesInfo.forEach((fileInfo) => {
      formData.append("files", fileInfo.file);
    });

    try {
      await axios.post(`http://api.programator.sk/gallery/${galleryTitle}`, formData);
      console.log("Upload successful");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleCloseOverlay = () => {
    setDisplayOverlay("none");
    // Reload the page
    window.location.reload();
  };

  const handleCreateItemCardClick = () => {
    setDisplayOverlay("block");
  };

  return (
    <div>
      <div className="wrapper">
        <div className="create-info">
          <h1>Fotogaléria</h1>
          <p id="link-or-title">
            <Link id="toHomeLink" to="/" style={{ padding: 10 }}>
              <img src="/img/Frame-3.png" alt='linkBack' width="16" height="16" />{decodeURIComponent(galleryTitle)}
            </Link>
          </p>
        </div>
        <div className="grid-container">
          {images.map((image) => (
            <PhotoCard myimage={image.fullpath} myalt={image.name} key={image.name} />
          ))}
          <CreateItemCard onClick={handleCreateItemCardClick} />
        </div>
      </div>
      <div className="hero">
        <div id="overlay" style={{ display: displayOverlay }}>
          <div className="card-l-design-width">
            <div className="form">
              <div className="title">
                <h3>Pridať fotky</h3>
                <p className="closeOverlay" onClick={handleCloseOverlay}>X</p>
              </div>
              <div onDragOver={handleDragOver} onDrop={handleDrop}>
                <input
                  type="file"
                  multiple
                  onChange={(event) => {
                    const newFilesInfo = Array.from(event.target.files).map((file) => ({
                      path: file.name,
                      fullpath: `Umenie/${file.name}`,
                      name: file.name.split(".")[0].charAt(0).toUpperCase() + file.name.split(".")[0].slice(1),
                      modified: file.lastModifiedDate.toISOString(),
                      file,
                    }));
                    setFilesInfo(newFilesInfo);
                    console.log("Files info:", newFilesInfo);
                  }}
                  hidden
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                />
                <div id="img-view">
                  <div id="img-view-content">
                    <img src="/img/icon.png" alt='' />
                    <p>Sem presunte fotky</p>
                    <span>alebo</span>
                    <p className="chooseImages" onClick={() => inputRef.current.click()}>Vyberte súbory</p>
                  </div>
                </div>
              </div>
              <button id="submitButton" type="submit" onClick={handleUpload}>Pridať</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;