import { useState } from 'react';
import { generateWallpaper } from '../utils/api';

export const useGenerateWallpaper = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWallpaper = async () => {
    setLoading(true);
    const url = await generateWallpaper();
    setImageUrl(url);
    setLoading(false);
  };

  return { imageUrl, loading, fetchWallpaper };
};
