import { useState, useEffect } from "react";
import Layout from "./components/layout";
import Card from "./components/card";

type Artist = {
  artistName: string;
  primaryGenreName: string;
  artistLinkUrl: string;
  amgArtistId: number;
};

const App = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtistsData = async () => {
      try {
        const response = await fetch(
          "https://itunes.apple.com/lookup?amgArtistId=468749,5723&entity=album&limit=2"
        );
        const data = await response.json();
        const responseData = data.results.filter(
          (result: any) => result.wrapperType === "artist"
        );
        setArtists(
          responseData.map((artist: any) => ({
            artistName: artist.artistName,
            primaryGenreName: artist.primaryGenreName,
            artistLinkUrl: artist.artistLinkUrl,
            amgArtistId: artist.amgArtistId,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtistsData();
  }, []);

  return (
    <div>
      <Layout>
        {artists.map((artist, index) => (
          <Card key={index} artist={artist} />
        ))}
      </Layout>
    </div>
  );
};

export default App;
