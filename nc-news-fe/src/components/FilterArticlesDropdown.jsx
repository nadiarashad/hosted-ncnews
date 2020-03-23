import React from 'react';

const FilterArticlesDropdown = (props) => {
    return (
        <div>
            <p>Filter through the articles, input a topic and an author here:</p>
            <p>Author:</p>
            <select className='drop-down' onClick={(e) => { props.handleFilterInput(e.target.value) }}  >
                <option value=''>Select</option>
                <option value='tickle122'>tickle122</option>
                <option value='grumpy19'>grumpy19</option>
                <option value='happyamy2016'>happyamy2016</option>
                <option value='cooljmessy'>cooljmessy</option>
                <option value='weegembump'>weegembump</option>
                <option value='jessjelly'>jessjelly</option>
            </select>
        </div>
    );
};

export default FilterArticlesDropdown;