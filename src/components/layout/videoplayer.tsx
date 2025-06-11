"use client";

import React, { useEffect, useRef, useState } from "react";

// YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoUrl: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  controls?: boolean;
  mute?: boolean;
}

interface YouTubePlayer {
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  width = "100%",
  height = "315",
  autoplay = false,
  controls = true,
  mute = false,
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Load YouTube IFrame API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const checkAPI = () => {
        if (window.YT && window.YT.Player) {
          setIsLoading(false);
          if (videoId) {
            initializePlayer();
          }
        } else {
          setTimeout(checkAPI, 100);
        }
      };

      window.onYouTubeIframeAPIReady = checkAPI;

      // If API is already loaded
      if (window.YT) {
        checkAPI();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Extract video ID when URL changes
  useEffect(() => {
    const newVideoId = extractVideoId(videoUrl);
    setVideoId(newVideoId);
  }, [videoUrl]);

  // Initialize or update player when video ID changes
  useEffect(() => {
    if (videoId && !isLoading) {
      if (window.YT && window.YT.Player) {
        if (playerReady && playerRef.current) {
          // Update existing player
          playerRef.current.loadVideoById(videoId);
        } else {
          // Initialize new player
          initializePlayer();
        }
      }
    }
  }, [videoId, isLoading]);

  const initializePlayer = (): void => {
    if (!videoId || isLoading) return;

    try {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: height,
        width: width,
        videoId: videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: controls ? 1 : 0,
          mute: mute ? 1 : 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
          },
          onError: (event: any) => {
            console.error("YouTube Player Error:", event.data);
          },
        },
      });
    } catch (error) {
      console.error("Failed to initialize YouTube player:", error);
    }
  };

  if (!videoId) {
    return (
      <div
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        className="flex items-center justify-center bg-gray-200 text-gray-500 border border-gray-300 rounded"
      >
        Invalid YouTube URL
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        className="flex items-center justify-center bg-gray-100 text-gray-500 border border-gray-300 rounded"
      >
        Loading YouTube Player...
      </div>
    );
  }

  return (
    <div
      id="youtube-player"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

export default YouTubePlayer;
