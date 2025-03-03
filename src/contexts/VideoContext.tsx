'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface VideoState {
  playbackId: string | null;
  setPlaybackId: (id: string) => void;
}

const VideoContext = createContext<VideoState | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [playbackId, setPlaybackId] = useState<string | null>(null);

  useEffect(() => {
    const savedPlaybackId = localStorage.getItem('playbackId');
    if (savedPlaybackId) {
      setPlaybackId(savedPlaybackId);
    }
  }, []);

  useEffect(() => {
    if (playbackId) {
      localStorage.setItem('playbackId', playbackId);
    }
  }, [playbackId]);

  return (
    <VideoContext.Provider value={{ playbackId, setPlaybackId }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}