import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Section, SectionHeader } from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ZoomIn, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { api } from '../../services/api';
import { PortfolioItem } from '../../types';

// --- Custom Video Player (Same as before, omitted for brevity but included in final build logic) ---
// Re-using the logic from previous artifact but ensuring it uses the props correctly
const CustomVideoPlayer = ({ src, poster, hasAudio = true }: { src: string; poster?: string; hasAudio?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(!hasAudio);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);
  const [showNoSoundMsg, setShowNoSoundMsg] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasAudio) { setVolume(0); setIsMuted(true); }
  }, [hasAudio]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => { if (videoRef.current) setCurrentTime(videoRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) { videoRef.current.currentTime = time; setCurrentTime(time); }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasAudio) return;
    const newVolume = Number(e.target.value);
    if (videoRef.current) { videoRef.current.volume = newVolume; videoRef.current.muted = newVolume === 0; }
    setVolume(newVolume); setIsMuted(newVolume === 0);
  };
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasAudio) { setShowNoSoundMsg(true); setTimeout(() => setShowNoSoundMsg(false), 2000); return; }
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && volume === 0) { setVolume(0.5); videoRef.current.volume = 0.5; }
    }
  };
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) { videoRef.current?.parentElement?.requestFullscreen(); setIsFullscreen(true); }
    else { document.exitFullscreen(); setIsFullscreen(false); }
  };
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => { if (isPlaying && !isVolumeDragging) setShowControls(false); }, 2000);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = volume * 100;

  return (
    <div className="relative w-full h-full group bg-black flex items-center justify-center select-none" onMouseMove={handleMouseMove} onClick={togglePlay}>
      <video ref={videoRef} src={src} poster={poster} className="max-h-[80vh] max-w-full w-auto h-auto object-contain" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} playsInline />
      <AnimatePresence>
        {showNoSoundMsg && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-10 bg-red-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm z-50 text-sm font-medium shadow-lg">
            <AlertCircle size={16} /> Video has no sound
          </motion.div>
        )}
      </AnimatePresence>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
            <Play size={40} className="text-white ml-2" fill="white" />
          </div>
        </div>
      )}
      <div className={cn("absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-6 pt-12 transition-opacity duration-300", showControls ? "opacity-100" : "opacity-0")} onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-1.5 group/timeline mb-4 cursor-pointer">
          <input type="range" min="0" max={duration || 100} step="0.01" value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" />
          <div className="absolute inset-0 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-gold-400" style={{ width: `${progressPercent}%` }} /></div>
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg pointer-events-none z-10 transition-transform group-hover/timeline:scale-150" style={{ left: `${progressPercent}%`, transform: `translate(-50%, -50%)` }} />
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <button onClick={togglePlay} className="hover:text-gold-400 transition-colors p-2">{isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}</button>
            <div className="flex items-center group/volume relative pl-2" onMouseEnter={() => setIsVolumeDragging(false)}>
              <button onClick={toggleMute} className={cn("transition-colors z-10 relative", !hasAudio ? "text-gray-500 cursor-not-allowed" : "hover:text-gold-400")}>{isMuted || !hasAudio ? <VolumeX size={24} /> : <Volume2 size={24} />}</button>
              <div className={cn("w-0 overflow-hidden transition-all duration-300 ease-out flex items-center group-hover/volume:w-28", hasAudio && "group-hover/volume:pl-4")}>
                <div className="relative w-24 h-1 cursor-pointer group/slider">
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} onMouseDown={() => setIsVolumeDragging(true)} onMouseUp={() => setIsVolumeDragging(false)} disabled={!hasAudio} className={cn("absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer", !hasAudio && "cursor-not-allowed")} />
                    <div className="absolute inset-0 bg-white/30 rounded-full overflow-hidden"><div className={cn("h-full", hasAudio ? "bg-gold-400" : "bg-gray-600")} style={{ width: `${volumePercent}%` }} /></div>
                    {hasAudio && (<div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md pointer-events-none z-10" style={{ left: `${volumePercent}%`, transform: `translate(-50%, -50%)` }}><div className={cn("absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-charcoal text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 transition-all duration-200 transform translate-y-2", "group-hover/slider:opacity-100 group-hover/slider:translate-y-0")}>{Math.round(volumePercent)}%<div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div></div></div>)}
                </div>
              </div>
            </div>
          </div>
          <button onClick={toggleFullscreen} className="hover:text-gold-400 transition-colors p-2">{isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}</button>
        </div>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.getPortfolio().then(setItems);
  }, []);

  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Films'];
  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.type === (filter === 'Films' ? 'video' : 'photo') && (filter === 'Films' || item.category === filter || filter === 'Wedding'));

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [selectedIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedIndex === null) return;
      e.preventDefault();
      if (scrollTimeoutRef.current) return;
      if (e.deltaY > 0) handleNext(); else if (e.deltaY < 0) handlePrev();
      scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 300);
    };
    if (selectedIndex !== null) window.addEventListener('wheel', handleWheel, { passive: false });
    return () => { window.removeEventListener('wheel', handleWheel); if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); };
  }, [selectedIndex, handleNext, handlePrev]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <Section id="portfolio" className="bg-ivory relative overflow-hidden">
      <div
        className="devider"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg id='comp-m8p05ivd-top' preserveAspectRatio='xMidYMax slice' data-bbox='0 235.771 1920 64.229' viewBox='0 235.771 1920 64.229' height='100%25' width='100%25' xmlns='http://www.w3.org/2000/svg' data-type='shape'%3E%3Cdefs%3E%3Cstyle%3E%23comp-m8p05ivd-top %7B fill: %2307363c; %7D%3C/style%3E%3C/defs%3E%3Cg%3E%3Cpath d='M970.29 244.628 960 235.771l-10.289 8.857a167.374 167.374 0 0 1-109.19 40.521H0V300h1920v-14.852h-840.521a167.373 167.373 0 0 1-109.189-40.52z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 pointer-events-none" />
      <SectionHeader title="Visual Diary" subtitle="Our Portfolio" />

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setSelectedIndex(null);
            }}
            className={cn(
              "text-xs md:text-sm uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all duration-300 border",
              filter === cat
                ? "bg-charcoal text-white border-charcoal"
                : "bg-transparent text-gray-500 border-gray-300 hover:border-gold-400 hover:text-gold-400",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id}
              className="group relative cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative bg-white p-3 shadow-xl rounded-sm transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                  <img
                    src={
                      item.type === "video" ? item.poster || item.src : item.src
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <span className="text-gold-400 tracking-[0.2em] uppercase text-xs mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl italic mb-4">
                      {item.title}
                    </h3>
                    <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-300">
                      {item.type === "video" ? (
                        <Play size={20} fill="currentColor" />
                      ) : (
                        <ZoomIn size={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-2 text-center">
                  <p className="font-serif text-charcoal text-lg">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] bg-white/10 p-2 rounded-full hover:bg-red-500/20"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[110] p-4 hover:bg-white/5 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={40} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[110] p-4 hover:bg-white/5 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={40} />
            </button>
            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl w-full h-full max-h-[90vh] p-4 flex flex-col items-center justify-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center bg-black/20 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                {selectedItem.type === "video" ? (
                  <CustomVideoPlayer
                    src={selectedItem.src}
                    poster={selectedItem.poster}
                    hasAudio={selectedItem.hasAudio}
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              <div className="mt-6 text-center absolute bottom-8 pointer-events-none drop-shadow-md">
                <h3 className="text-3xl font-serif text-white italic">
                  {selectedItem.title}
                </h3>
                <p className="text-gold-400 uppercase tracking-widest text-xs mt-2">
                  {selectedItem.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center mt-20">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/gallery")}
        >
          View Full Gallery
        </Button>
      </div>
    </Section>
  );
};
