import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import SortArticlesForm from './sortArticlesForm';
import OrderArticles from './OrderArticlesForm'
// import FilterArticlesForm from './FilterArticlesForm'


class SortArticles extends Component {
    state = {
        author: '',
    }


    handleFilterInput = (filterAuthor) => {
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
                <SortArticlesForm handleSort={this.props.handleSort} />
                <OrderArticles handleOrder={this.props.handleOrder} />

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


                <br></br> <br></br>
                <Button variant='dark' onClick={this.props.clearFilters}>Clear filters</Button>{' '}
            </div >
        );
    }
}

export default SortArticles;