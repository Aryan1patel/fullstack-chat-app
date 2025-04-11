import React, { createContext, useState, useRef, useEffect } from "react";
import { use } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const backgroundMusicRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const harleysound = useRef(null);
  const dextersound = useRef(null);
  const tylersound =useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Initialize background music
    backgroundMusicRef.current = new Audio("/sounds/music11.mp3");
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5;


    // Initialize hover and click sound effects
    hoverSoundRef.current = new Audio("/sounds/hovernew.mp3");
    clickSoundRef.current = new Audio("/sounds/hovernew.mp3");
    harleysound.current = new Audio("/sounds/harleyy.mp3");
    dextersound.current = new Audio("/sounds/dexterr.mp3");
    tylersound.current = new Audio("/sounds/tyler2.mp3");


    // Cleanup on unmount
    return () => {
      backgroundMusicRef.current?.pause();
      hoverSoundRef.current = null;
      clickSoundRef.current = null;
      harleysound.current = null;
      dextersound.current = null;
      tylersound.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      backgroundMusicRef.current.pause();
    } else {
      backgroundMusicRef.current.play().catch((error) => {
        console.warn("Auto-play blocked by browser. User must interact first.", error);
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const playMusic = () => {
    if (!isMusicPlaying) {
      backgroundMusicRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  };

  const playharley =()=>{
    if(harleysound.current){
      harleysound.current.currentTime = 0;
      harleysound.current.play().catch(() => {});
    }
  }

  const playdexter =() =>{
    if(dextersound.current){
      dextersound.current.currentTime = 0;
      dextersound.current.play().catch(() => {});
    }
  }

  const playtyler =() =>{
    if(tylersound.current){
      tylersound.current.currentTime = 0;
      tylersound.current.play().catch(() => {});
    }
  }

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(() => {});
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
  };

  return (
    <MusicContext.Provider value={{ isMusicPlaying, toggleMusic, playMusic, playHoverSound, playClickSound , playharley , playdexter , playtyler}}>
      {children}
    </MusicContext.Provider>
  );
};
