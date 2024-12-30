
export const HomeScreenData = async (setTopPlayer) => {
  try {
    const response = await fetch(`http://44.195.206.105/players/top-players`);
    const json = await response.json();
    setTopPlayer(json);
  } catch (error) {
    console.error('Error fetching player data:', error);
  }
};

