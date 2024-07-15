import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setOneSongData } from "../Redux/actions";

export const AlbumDetails = () => {
  const location = useLocation();
  const album = location.state;
  const dispatch = useDispatch();

  console.log("albumdetails", album);

  if (!album) {
    return <Typography variant="h6">No album data available.</Typography>;
  }

  const albumSongs = album?.songs || [];
  const albumArtists = album?.artists || [];

  const getArtistNames = (song) => {
    const artistNames = song.artist.map((artistId) => {
      const matchingArtist = albumArtists.find(
        (artist) => artist._id === artistId
      );
      return matchingArtist ? matchingArtist.name : null;
    });
    return artistNames.filter((name) => name !== null).join(", ");
  };

  const handleSongClick = (song) => {
    dispatch(setOneSongData(song));
  };

  return (
    <div style={{ margin: "30px" }}>
      <Card>
        <div style={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="300"
            image={album.image}
            alt={album.title}
            style={{ flex: 1 }}
          />
          <CardContent style={{ flex: 2 }}>
            <Typography variant="h5" gutterBottom>
              {album.title} | {album.artists[0]?.name}
            </Typography>
            <Typography variant="h3">{album.title}</Typography>
            {/* Add more album details here */}
          </CardContent>
        </div>
      </Card>

      <List>
        {albumSongs.map((song) => (
          <ListItem key={song._id} onClick={() => handleSongClick(song)} button>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar src={song.thumbnail} alt={song.title} />
              </Grid>
              <Grid item xs={6}>
                <ListItemText
                  primary={song.title}
                  secondary={getArtistNames(song)}
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                >
                  <PlayArrow style={{ color: "black" }} />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
