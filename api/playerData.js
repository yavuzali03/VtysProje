
export const PlayerData = async (id, setPlayerData, setLoading) => {
  try {
    const response = await fetch(`http://44.195.206.105/players/by-id?id=${id}`);
    const json = await response.json();
    setPlayerData(json);
  } catch (error) {
    console.error('Error fetching player data:', error);
  } finally {
    setLoading(false);
  }
};

