import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "https://i.ibb.co/qCkd9jS/img1.jpg",
      name: "Switzerland",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    },
    {
      id: 2,
      image: "https://i.ibb.co/jrRb11q/img2.jpg",
      name: "Finland",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    },
    {
      id: 3,
      image: "https://i.ibb.co/NSwVv8D/img3.jpg",
      name: "Iceland",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    },
    {
      id: 4,
      image: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
      name: "Australia",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    },
    {
      id: 5,
      image: "https://i.ibb.co/jTQfmTq/img5.jpg",
      name: "Netherland",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    },
    {
      id: 6,
      image: "https://i.ibb.co/RNkk6L0/img6.jpg",
      name: "Ireland",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!"
    }
  ]);

  // Animation keyframes definition for React
  const animateKeyframes = {
    '0%': {
      opacity: 0,
      transform: 'translate(0, 100px)',
      filter: 'blur(33px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translate(0)',
      filter: 'blur(0)'
    }
  };

  // Base styles
  const styles = {
    container: {
      position: 'absolute',
      left: '50%',
      borderRadius: '20px',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1416px',
      height: '850px',
      boxShadow: '0 30px 50px rgba(19, 19, 19, 0.1)', // Optional: adds a soft shadow
    },
    slide: {
      position: 'relative',
      height: '100%',
      borderRadius: '20px', // Added to ensure the larger image has rounded corners
      overflow: 'hidden', // Ensure the rounded corners are visible
    },
    item: {
      width: '200px',
      height: '300px',
      position: 'absolute',
      borderRadius: '20px',
      top: '50%',
      transform: 'translate(0, -50%)',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      display: 'inline-block',
      transition: '0.5s',
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '100px',
      width: '300px',
      textAlign: 'left',
      color: '#eee',
      transform: 'translate(0, -50%)',
      fontFamily: 'system-ui',
      display: 'none'
    },
    name: {
      fontSize: '40px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0,
      animation: 'animate 1s ease-in-out 1 forwards'
    },
    description: {
      marginTop: '10px',
      marginBottom: '20px',
      opacity: 0,
      animation: 'animate 1s ease-in-out 0.3s 1 forwards'
    },
    seeMoreButton: {
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      opacity: 0,
      animation: 'animate 1s ease-in-out 0.6s 1 forwards'
    },
    buttonContainer: {
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      bottom: '20px'
    },
    navButton: {
      background: 'black',
      width: '50px',
      height: '35px',
      borderRadius: '8px',
      border: '1px solid #000',
      cursor: 'pointer',
      margin: '0 5px',
      transition: '0.3s',
       
    },
    navButtonHover: {
      background: 'black', 
      color: '#fff'
    }
  };

  const handleNext = () => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const firstSlide = newSlides.shift();
      newSlides.push(firstSlide);
      return newSlides;
    });
  };

  const handlePrev = () => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const lastSlide = newSlides.pop();
      newSlides.unshift(lastSlide);
      return newSlides;
    });
  };

  // Automatically slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Add styles to document for animation (can also use a CSS-in-JS library)
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes animate {
        from {
          opacity: 0;
          transform: translate(0, 100px);
          filter: blur(33px);
        }
        to {
          opacity: 1;
          transform: translate(0);
          filter: blur(0);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="bg-base-100" style={styles.container}> {/* Add DaisyUI background class */}
      <div style={styles.slide}>
        {slides.map((slide, index) => {
          // Dynamic styles based on slide position
          let itemStyle = { ...styles.item, backgroundImage: `url(${slide.image})` };
          let contentStyle = { ...styles.content };
          
          // First and second items
          if (index === 0 || index === 1) {
            itemStyle = {
              ...itemStyle,
              top: 0,
              left: 0,
              transform: 'translate(0, 0)',
              borderRadius: '20px', // Ensure rounded corners for the larger image
              width: '100%',
              height: '100%'
            };
          }
          
          // Show content for second slide
          if (index === 1) {
            contentStyle = {
              ...contentStyle,
              display: 'block'
            };
          }
          
          // Position third slide
          if (index === 2) {
            itemStyle = {
              ...itemStyle,
              left: '50%'
            };
          }
          
          // Position fourth slide
          if (index === 3) {
            itemStyle = {
              ...itemStyle,
              left: 'calc(50% + 220px)'
            };
          }
          
          // Position fifth slide
          if (index === 4) {
            itemStyle = {
              ...itemStyle,
              left: 'calc(50% + 440px)'
            };
          }
          
          // Hide slides beyond the fifth
          if (index >= 5) {
            itemStyle = {
              ...itemStyle,
              left: 'calc(50% + 660px)',
              opacity: 0
            };
          }
          
          return (
            <div
              key={slide.id}
              style={itemStyle}
            >
              <div style={contentStyle}>
                <div style={styles.name}>{slide.name}</div>
                <div style={styles.description}>{slide.description}</div>
                <button style={styles.seeMoreButton}>See More</button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.navButton} 
          onClick={handlePrev}
          onMouseOver={(e) => {
            e.currentTarget.style.background = styles.navButtonHover.background;
            e.currentTarget.style.color = styles.navButtonHover.color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '';
            e.currentTarget.style.color = '';
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button 
          style={styles.navButton} 
          onClick={handleNext}
          onMouseOver={(e) => {
            e.currentTarget.style.background = styles.navButtonHover.background;
            e.currentTarget.style.color = styles.navButtonHover.color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '';
            e.currentTarget.style.color = '';
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;