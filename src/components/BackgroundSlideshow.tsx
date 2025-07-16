import React, { useState, useEffect } from 'react';

interface BackgroundSlideshowProps {
  children: React.ReactNode;
}

const BackgroundSlideshow: React.FC<BackgroundSlideshowProps> = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images
  const backgroundImages = [
    '/posters_background/poster1.jpg',
    '/posters_background/poster2.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="slideshow-container">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`slideshow-image ${
            index === currentImageIndex ? 'active' : ''
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="slideshow-overlay" />
      
      {/* CRT Scan-lines */}
      <div className="crt-scanlines" />
      
      {/* Content */}
      <div className="slideshow-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;