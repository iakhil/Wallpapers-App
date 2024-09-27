import axios from 'axios';

const OPENAI_API_KEY = '';  // Your actual API key

export const generateWallpaper = async (prompt, size = '1024x1024') => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: '1024x1024',  // Use the dynamically passed screen size
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating wallpaper:', error.response ? error.response.data : error.message);
    return null;
  }
};
