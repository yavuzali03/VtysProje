
export const PlayerComment = async (id, setComment) => {
  try {
    const response = await fetch(`http://44.195.206.105/player/${id}/comments`);
    const json = await response.json();
    setComment(json);
  } catch (error) {
    console.error('Error fetching player data:', error);
  } ;
};

