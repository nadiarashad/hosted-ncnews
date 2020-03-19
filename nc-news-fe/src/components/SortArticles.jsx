import React, { Component } from 'react';

class SortArticles extends Component {
    state = {
        author: '',
        topic: ''
    }


    handleFilterInput = (field, input) => {

        this.setState({ [field]: input })
    }

    handleSubmit = event => {

        event.preventDefault();

        const { filterArticles } = this.props;

        filterArticles(this.state);
        this.setState({ author: '', topic: '' })
    };



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
                <br></br>
                <br></br>

                order:
 <select onChange={(e) => { this.props.handleOrder(e.target.value) }}  >
                    <option>Select</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <br></br>
                <br></br>
                filter through the articles, input a topic or an author here:
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Author:{' '}
                        <input
                            value={this.state.author}
                            type="text"
                            onChange={event => {
                                this.handleFilterInput('author', event.target.value);
                            }}
                        />
                        Topic:{' '}
                        <input
                            value={this.state.topic}
                            type="text"
                            onChange={event => {
                                this.handleFilterInput('topic', event.target.value);
                            }}
                        />
                        <button type="submit">Submit</button>
                    </label>
                    <button onClick={this.props.clearFilters}>Clear filters</button>
                </form>

            </div>
        );
    }
}

export default SortArticles;