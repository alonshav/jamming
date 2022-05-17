import React from "react";
import Spotify from "../../util/Spotify";
import PlaylistList from '../PlaylistList/PlaylistList'
import './UserPlaylist.css'

class UserPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlists:[]
        }
    }
    async componentDidMount() {
        const playlists = await Spotify.getUserPlaylists()
        this.setState({playlists:playlists})
    }
    render() {
        return (
            <div className="UserPlaylist">
                <h2>My Playlists</h2>
                <div className="PlaylistList">
                    <PlaylistList  playlists={this.state.playlists} onEdit={this.props.onEdit}/>
                </div>
            </div>
        )
    }
}

export default UserPlaylist