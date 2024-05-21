type Album = {
  collectionName: string;
  artworkUrl100: string;
};

type Props = {
  albums: Album[];
};

const Grid = ({ albums }: Props) => {
  return (
    <div className="grid">
      {albums.map((album, index) => (
        <div key={index} className="grid-item">
          {" "}
          <img src={album.artworkUrl100} alt={album.collectionName} />
          <p>{album.collectionName}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
