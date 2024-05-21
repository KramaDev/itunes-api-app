import { useState, useEffect } from "react";

type Artist = {
  artistName: string;
  primaryGenreName: string;
  artistLinkUrl: string;
  amgArtistId: number; // Add this property to the Artist type
};

type Album = {
  collectionName: string;
  artworkUrl100: string;
};

type Props = {
  artist: Artist;
};

const Card = ({ artist }: Props) => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    // Fetch data from iTunes API for albums of each artist
    const fetchAlbumsData = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?amgArtistId=${artist.amgArtistId}&entity=album`
        );
        const data = await response.json();
        const responseData = data.results.filter(
          (result: any) => result.wrapperType === "collection"
        );
        const newAlbums: Album[] = responseData.map((album: any) => ({
          collectionName: album.collectionName,
          artworkUrl100: album.artworkUrl100,
        }));
        setAlbums(newAlbums);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlbumsData();
  }, [artist]); // Fetch albums data when artist changes

  return (
    <div className="card">
      <h2>{artist.artistName}</h2>
      <p>Genre: {artist.primaryGenreName}</p>
      <a href={artist.artistLinkUrl} target="_blank" rel="noopener noreferrer">
        View on iTunes
      </a>
      <h3>Albums:</h3>
      <div className="albums">
        {albums.map((album, index) => (
          <div key={index} className="album">
            <img src={album.artworkUrl100} alt={album.collectionName} />
            <p>{album.collectionName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
