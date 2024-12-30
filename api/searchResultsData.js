
export const SearchResultsData = async (searchValue, setPlayersData, setLoading) => {
  try {
    const response = await fetch(`http://44.195.206.105/live-search?query=${searchValue}`);
    const json = await response.json();
    setPlayersData(json);
  } catch (error) {
    console.error('Error fetching player data:', error);
  } finally {
    setLoading(false);
  }
};

