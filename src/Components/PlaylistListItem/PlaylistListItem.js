import React from "react";
import './PlaylistListItem.css'

class PlaylistListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(){
        this.props.onEdit(this.props.playlist.id,this.props.playlist.name)
    }

    render() {
        return (
            <li className="PlaylistListItem" key={this.props.index}>
                <button className="PlaylistListItem-information" onClick={this.handleOnClick}>
                    <h3>{this.props.playlist.name}</h3>
                </button>
            </li>
        )
    }
}

export default PlaylistListItem