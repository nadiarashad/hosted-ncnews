import React from 'react';

const SortArticlesForm = (props) => {
    return (
        <div>
            <p>sort:</p>
            <select onChange={(e) => { props.handleSort(e.target.value) }}  >
                <option>Select</option>
                <option value='created_at'>Date</option>
                <option value='comment_count'>Comment count</option>
                <option value='votes'>Votes</option>
            </select>
            <br></br> <br></br>
        </div>
    );
};

export default SortArticlesForm;