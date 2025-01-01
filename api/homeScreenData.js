
export const HomeScreenData = async (setTopPlayer , setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(`http://44.195.206.105/players/top-players`);
    const json = await response.json();
    if (json.player_id === "313131313131") {
      json.image_url = "https://i.ibb.co/ggrKT1V/vesikal-k.png";
    }
    else if(json.player_id === "464646464646"){
      json.image_url = "https://i.ibb.co/KX1mDmB/Katman-4.png";
    }
    setTopPlayer(json);
  } catch (error) {
    console.error('Error fetching player data:', error);
  }finally {
    setLoading(false);
  }
};

