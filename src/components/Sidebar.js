import React from 'react';
import AnimeCard from './AnimeCard'; // optional if you want a card layout

function Sidebar({ topAnime, loading }) {
  if (loading) return <aside><p>Loading top anime...</p></aside>;
  if (!topAnime.length) return <aside><p>No top anime found.</p></aside>;

  return (
    <aside>
      <nav>
        <h3>  Top Anime</h3>
        {topAnime.map(anime => (
          // Option 1: simple links
          <a key={anime.mal_id} href={anime.url} target="_blank" rel="noreferrer">
            {anime.title}
          </a>

          // Option 2: use AnimeCard component instead
          // <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
