import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class SortArticles extends Component {
    state = {
        author: '',
    }


    handleFilterInput = (filterAuthor) => {
        console.log(filterAuthor)
        this.setState({ author: filterAuthor })

        const { filterArticles } = this.props;

        filterArticles(filterAuthor);
    }

    handleSubmit = event => {
        event.preventDefault();

        const { filterArticles } = this.props;

        filterArticles(this.state);
        this.setState({ author: '' })
    };


    render() {
        return (
            <div>
                <p>sort:</p>
                <select onChange={(e) => { this.props.handleSort(e.target.value) }}  >
                    <option>Select</option>
                    <option value='created_at'>Date</option>
                    <option value='comment_count'>Comment count</option>
                    <option value='votes'>Votes</option>
                </select>
                <br></br> <br></br>
                <p>order:</p>
                <select onChange={(e) => { this.props.handleOrder(e.target.value) }}  >
                    <option>Select</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <br></br>
                <br></br>

                <p>Filter through the articles, input a topic and an author here:</p>
                <p>Author:</p>
                <select className='drop-down' onClick={(e) => { this.handleFilterInput(e.target.value) }}  >
                    <option value=''>Select</option>
                    <option value='tickle122'>tickle122</option>
                    <option value='grumpy19'>grumpy19</option>
                    <option value='happyamy2016'>happyamy2016</option>
                    <option value='cooljmessy'>cooljmessy</option>
                    <option value='weegembump'>weegembump</option>
                    <option value='jessjelly'>jessjelly</option>
                </select>


                <br></br><br></br>
                <Button variant='dark' onClick={this.props.clearFilters}>Clear filters</Button>{' '}
            </div >
        );
    }
}

export default SortArticles;