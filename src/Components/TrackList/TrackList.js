import React from "react";
import Track from '../Track/Track.js'
import './TrackList.css'

class TrackList extends React.Component {
    render() {
        return (
            <ul className="TrackList">
                {this.props.tracks.map((track,index) => {
                    return <Track track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
                })}
            </ul>
        )
    }
}

export default TrackList