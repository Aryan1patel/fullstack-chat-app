import { useState, useEffect } from 'react';

function GalleryShowcase() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const panels = [
    { image: '/image/fin/1.jpeg' },
    { image: '/image/fin/2.jpeg' },
    { image: '/image/fin/3.jpeg' },
    { image: '/image/fin/4.jpeg' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setExpandedIndex((prevIndex) => (prevIndex + 1) % panels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [panels.length]);

  const handleClick = (index) => {
    setExpandedIndex(index);
  };

  return (
    <main className="w-screen h-screen bg-black overflow-hidden relative">
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 py-2 px-4 rounded-md shadow-lg z-20">
        <h2 className="text-xl font-bold text-gray-800">Discover the Beauty of Finland</h2>
      </div>
      <div
        className="h-full w-full overflow-hidden flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${panels[expandedIndex].image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        <div className="inset-0 absolute bg-[rgba(227, 133, 210, 0.7)] backdrop-blur-md z-0"></div>
        <div className="flex w-full max-w-7xl h-[80vh] gap-2 items-center justify-center z-10">
          {panels.map((panel, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`
                h-full rounded-2xl bg-white cursor-pointer
                transition-all duration-500 ease-in-out overflow-hidden
                ${expandedIndex === index ? 'w-[60%]' : 'w-[10%] hover:bg-gray-200'}
                min-w-[40px] block
              `}
            >
              <img src={panel.image} alt="Gallery item" className="w-full h-full object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default GalleryShowcase;
