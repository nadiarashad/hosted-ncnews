import React from 'react';

const OrderArticlesForm = (props) => {
    return (
        <div>
            <p>order:</p>
            <select onChange={(e) => { props.handleOrder(e.target.value) }}  >
                <option>Select</option>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
            <br></br>
            <br></br>
        </div>
    );
};

export default OrderArticlesForm;
