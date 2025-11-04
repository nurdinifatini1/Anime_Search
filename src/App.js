import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './assets/css/main.css';
import './assets/scss/main.scss';


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Fetch top anime (Jikan v4)
  const getTopAnime = async () => {
    setLoadingTop(true);
    try {
      const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=5');
      const data = await res.json();

      if (data.data) {
        setTopAnime(data.data);
      } else {
        console.error("Top anime not found:", data);
        setTopAnime([]);
      }
    } catch (err) {
      console.error("Failed to fetch top anime:", err);
      setTopAnime([]);
    } finally {
      setLoadingTop(false);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchAnime(search);
    }
  };

  // Fetch anime search results (Jikan v4)
  const fetchAnime = async (query) => {
    setLoadingSearch(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=title&sort=asc&limit=10`
      );
      const data = await res.json();

      if (data.data) {
        setAnimeList(data.data);
      } else {
        console.error("Search results not found:", data);
        setAnimeList([]);
      }
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setAnimeList([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Initial top anime fetch
  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} loading={loadingTop} />
        <MainContent
          HandleSearch={handleSearch}
          search={search}
          SetSearch={setSearch}
          animeList={animeList}
          loading={loadingSearch}
        />
      </div>
    </div>
  );
}

export default App;
