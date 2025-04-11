import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function GalleryShowcase2() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const panels = [
    { image: '/image/thailand/2.png' },
    { image: '/image/thailand/1.png' },
    { image: '/image/thailand/3.png' },
    { image: '/image/thailand/4.png' },
    { image: '/image/thailand/5.png' },
    { image: '/image/thailand/6.png' },
    { image: '/image/thailand/7.png' },
    { image: '/image/thailand/8.png' },
    { image: '/image/thailand/9.png' },
    { image: '/image/thailand/11.png' },
    { image: '/image/thailand/12.png' },
    { image: '/image/thailand/13.png' },
    { image: '/image/thailand/14.png' },
    { image: '/image/thailand/15.png' },
    { image: '/image/thailand/16.png' },
    { image: '/image/thailand/17.png' },
    { image: '/image/thailand/18.png' },
  ];

  // Add auto-transition effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setExpandedIndex((prevIndex) => (prevIndex + 1) % panels.length);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 300);
        }, 300);
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [panels.length, isAutoPlaying]);

  const handleClick = (index) => {
    if (index === expandedIndex) return;
    
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setExpandedIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
        setTimeout(() => {
          setIsAutoPlaying(true);
        }, 8000); // Resume auto-play after 8 seconds
      }, 300);
    }, 300);
  };

  const getNextIndex = () => (expandedIndex + 1) % panels.length;
  const getPrevIndex = () => (expandedIndex - 1 + panels.length) % panels.length;

  return (
    <main className="w-screen h-screen bg-black overflow-hidden">
      <div
        className="h-full w-full overflow-hidden flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${panels[expandedIndex].image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <AnimatePresence>
          <motion.div 
            className="inset-0 absolute bg-[rgba(238, 207, 255, 0.7)] backdrop-blur-md z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isTransitioning ? 0.9 : 0.7,
              backdropFilter: isTransitioning ? 'blur(15px)' : 'blur(5px)'
            }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="absolute top-6 left-6 z-20 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
          <span className="text-lg font-bold">{expandedIndex + 1} / {panels.length}</span>
        </div>

        <div className="flex flex-col w-full max-w-7xl h-[80vh] gap-4 items-center justify-center z-10">
          <div className="flex w-full h-[90%] gap-2 items-center justify-center">
            {panels.map((panel, index) => (
              <motion.div
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  h-full rounded-2xl cursor-pointer
                  transition-all duration-500 ease-in-out overflow-hidden
                  ${expandedIndex === index ? 'w-[100%]' : 'w-[10%] hover:bg-gray-200'}
                  min-w-[40px] block relative
                `}
                whileHover={{ 
                  scale: expandedIndex !== index ? 1.05 : 1,
                  boxShadow: "0px 0px 8px rgba(255,255,255,0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={panel.image} 
                  alt="Gallery item" 
                  className={`w-full h-full object-cover object-top transition-all duration-700 ${
                    expandedIndex === index ? 'scale-100' : 'scale-110'
                  }`} 
                />
                {expandedIndex !== index && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">{index + 1}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
 
        </div>
      </div>
    </main>
  );
}

export default GalleryShowcase2;