import React from "react";
import TrackList from '../TrackList/TrackList'
import './SearchResults.css'

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                    <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemove={this.props.onRemove}
                               isRemoval={true}/>
                </div>
            </div>
        )
    }
}

export default SearchResults