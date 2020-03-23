import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import SortArticlesForm from './sortArticlesForm';
import OrderArticles from './OrderArticlesForm'
import FilterArticlesDropdown from './FilterArticlesDropdown'



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
                <FilterArticlesDropdown handleFilterInput={this.handleFilterInput} />
                <br></br>
                <Button variant='dark' onClick={this.props.clearFilters}>Clear filters</Button>{' '}
            </div >
        );
    }
}

export default SortArticles;