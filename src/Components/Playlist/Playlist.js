import React from "react";
import TrackList from '../TrackList/TrackList'
import './Playlist.css'
import Track from "../Track/Track";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value)
    }

    render() {
        return (
            <div className="Playlist">
                <div className="Playlist-header">
                    <input spellCheck={false} value={this.props.playlistName} onChange={this.handleNameChange}/>
                </div>
                <div className="TrackList">
                    <TrackList tracks={this.props.playlistTracks} isRemoval={false} onRemove={this.props.onRemove}/>
                </div>
                <div className="saveButton">
                    <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
                </div>
            </div>
        )
    }
}

export default Playlist