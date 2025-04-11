import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MusicContext } from "../components/MusicContext.jsx";
import "../style/LandingPage.css";

const LandingPage = () => {
  const {
    playMusic,
    playHoverSound,
    playClickSound,
    playharley,
    playdexter,
    playtyler
  } = useContext(MusicContext);

  const slides = [
    {
      img: "/finland.jpg",
      text: "She is from Finland.",
      subtitle: "some pics from her home",
      link: "/gallery2"
    },
    {
      img: "/take.jpg",
      text: "She knows taekwondo.",
      subtitle: "So be careful"
    },
    {
      img: "/maldives.jpg",
      text: "Where she recently traveled.",
      subtitle: "Some pics taken by her",
      link: "/gallery"
    },
    {
      img: "/cakee.jpg",
      text: "Whats her favourite food to make.",
      subtitle: "you want to eat? you will if you are very lucky",
      link: "/image2"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    playHoverSound();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    playHoverSound();
  };

  return (
    <div className="min-h-screen text-white landing-page">
      {/* Hero Section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(/newbackk.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-5 text-6xl md:text-8xl font-bold text-pink-400 drop-shadow-lg"
            >
              ZeroWords
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-5 text-2xl max-w-md mx-auto text-zinc-700 drop-shadow-lg"
              style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)" }}
            >
              Fantasy Meets Reality
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="btn btn-primary btn-lg glass"
              onClick={() => {
                playHoverSound();
                playMusic();
              }}
              onMouseEnter={playHoverSound}
            >
              Play Music 👻
            </motion.button>
          </div>
        </div>
      </div>

      {/* Featured Characters */}
      <div className="bg-gradient-to-b from-base-300 to-base-100 py-16">
        <h1 className="text-center text-2xl font-bold mb-8 text-zinc-600 drop-shadow-lg">
          Featured Chat Characters ☃️
        </h1>
        <div className="text-black flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-4">
          {/* Harley Quinn Card */}
          <div className="card card-side bg-base-100 shadow-sm flex-1">
            <figure>
              <img src="/image/quinn2.jpg" alt="Harley Quinn" />
            </figure>
            <div className="card-body bg-white rounded-r-lg">
              <h2 className="card-title">Harley Quinn</h2>
              <p>
                But I'm the one they should be scared of! Not you, not Mistah
                J! Because I'm Harley f***ing Quinn!
              </p>
              <div className="card-actions justify-end">
                <Link to="/quinn" onClick={playharley}>
                  <button className="btn btn-accent">Talk to her</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dexter Card */}
          <div className="card card-side bg-base-100 shadow-sm flex-1">
            <figure>
              <img src="/image/dexter2.jpg" alt="Dexter" />
            </figure>
            <div className="card-body bg-white rounded-r-lg">
              <h2 className="card-title">Dexter (Stella's fav)</h2>
              <p>
                People fake a lot of human interactions, but I feel like I fake
                them all, and I fake them very well
              </p>
              <div className="card-actions justify-end">
                <Link to="/dexter" onClick={playdexter}>
                  <button className="btn btn-accent">Talk to him</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tyler Durden Card */}
          <div className="card card-side bg-base-100 shadow-sm flex-1">
            <figure>
              <img src="/image/tyler.jpg" alt="Tyler Durden" />
            </figure>
            <div className="card-body bg-white rounded-r-lg">
              <h2 className="card-title">Tyler Durden</h2>
              <p>You do not talk about Fight Club.</p>
              <div className="card-actions justify-end">
                <Link to="/tyler" onClick={playtyler}>
                  <button className="btn btn-accent">Talk to him</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/chat"
            className="relative inline-block px-8 py-4 text-lg font-bold text-white bg-primary rounded-xl overflow-hidden group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <span className="absolute inset-0 bg-primary transition-all duration-300 ease-out transform scale-100 group-hover:scale-110"></span>
            <span className="relative z-10">Main ChatApp 🎉</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black opacity-95 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-primary text-2xl font-bold mb-4 drop-shadow-lg">
            You Can Contact Me?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <p className="text-sm text-white">
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/aryanpatelap/"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                AryanPatel
              </a>
            </p>
            <p className="text-sm text-white">
              Email:{" "}
              <a
                href="mailto:ppparyanpatel@gmail.com"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ppparyanpatel@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
