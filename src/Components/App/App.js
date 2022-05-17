import React from "react";
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import UserPlaylist from "../UserPlaylist/UserPlaylist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack           = this.addTrack.bind(this);
        this.removeTrack        = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist       = this.savePlaylist.bind(this);
        this.search             = this.search.bind(this);
        this.editUserPlaylist   = this.editUserPlaylist.bind(this)

        this.state = {
            searchResults : [],
            playlistTracks: [],
            playlistName  : "Create New Playlist"
        }
    }

    addTrack(newTrack) {
        const updatedPlaylistTracks = [...this.state.playlistTracks];
        const foundTrack            = updatedPlaylistTracks.find((track) => track.id === newTrack.id);
        console.log(foundTrack)
        !foundTrack && updatedPlaylistTracks.push(newTrack)
        this.setState({playlistTracks: updatedPlaylistTracks})
    }

    removeTrack(existingTrack) {
        const updatedPlaylistTracks = [...this.state.playlistTracks].filter((track) => track.id !== existingTrack.id);
        console.log(updatedPlaylistTracks)
        this.setState({playlistTracks: updatedPlaylistTracks})

    }

    updatePlaylistName(name) {
        this.setState({playlistName: name})
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map((track) => track.uri)
        console.log(trackURIs)
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState(
                {
                    playlistName  : 'New Playlist',
                    playlistTracks: []
                })
        })
    }

    async editUserPlaylist(id,name) {
        const tracks = await Spotify.getPlaylistTracks(id);
        this.setState({playlistName: name, playlistTracks: tracks})
    }

    search(term) {
        Spotify.search(term).then((searchResults) =>
            this.setState({searchResults: searchResults})
        )
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName}
                                  playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
                                  onSave={this.savePlaylist}

                        />
                        <UserPlaylist onEdit={this.editUserPlaylist}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default App;
