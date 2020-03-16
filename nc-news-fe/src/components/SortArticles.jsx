import React, { Component } from 'react';

class SortArticles extends Component {
    render() {
        return (
            <div>
                sort:
                    <select onChange={(e) => { this.props.handleSort(e.target.value) }}  >
                    <option>Select</option>
                    <option value='created_at'>Date</option>
                    <option value='comment_count'>Comment count</option>
                    <option value='votes'>Votes</option>
                </select>

            </div>
        );
    }
}

export default SortArticles;