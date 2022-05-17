import React from "react";
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem'
import './PlaylistList.css'
import Spotify from "../../util/Spotify";

class PlaylistList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="PlaylistList">
                {this.props.playlists.map((playlistItem,index) => {
                    return <PlaylistListItem playlist={playlistItem} index={index} onEdit={this.props.onEdit}/>
                })}
            </ul>
        )
    }
}

export default PlaylistList