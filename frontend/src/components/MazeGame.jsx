import React from "react";

const MazeGame = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <iframe
        src="/maze/index.html"
        title="Maze Game"
        className="w-full h-full border-0"
      ></iframe>
    </div>
  );
};

export default MazeGame;


const SomePage = () => {
  // If you're using MusicContext, get the sound functions
  const { playHoverSound, playClickSound } = useContext(MusicContext);
  
  // Your characters data
  const characters = [
    { name: "Dexter", img: "/dexter.jpg", link: "/chat/dexter", description: "Chat with the forensic expert with dark secrets." },
    { name: "Batman", img: "batman-image-url", link: "/chat/batman", description: "Talk to the Dark Knight of Gotham City." },
    { name: "Harley Quinn", img: "harley-image-url", link: "/chat/harley", description: "Connect with the chaotic Queen of Crime." }
  ];

  return (
    <div className="your-page-container">
      {/* Other page content */}
      
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-400">
        Choose Your Character
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index + 0.7 }}
            whileHover={{ scale: 1.03 }}
            className="card card-side bg-gray-800 shadow-lg border border-pink-500/20 overflow-hidden h-48"
          >
            <figure className="w-2/5">
              <img
                src={character.img}
                alt={character.name}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="card-body w-3/5 p-4">
              <h2 className="card-title text-pink-400 text-lg">
                {character.name}
              </h2>
              <p className="text-gray-300 text-sm line-clamp-2">{character.description}</p>
              <div className="card-actions justify-end mt-auto">
                <Link to={character.link}>
                  <button
                    className="px-4 py-1 bg-pink-600 hover:bg-pink-700 transition-colors rounded font-medium text-sm"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* More page content */}
    </div>
  );
};
