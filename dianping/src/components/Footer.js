import React from 'react';

function Footer (props) {
    const { filter, setVisibleFillter } = props
    return (
        <div>
            <span>SHOW:</span>
            <button disabled={ filter === 'all' } onClick={() => setVisibleFillter('all')}>All</button>
            <button disabled={ filter === 'active' } onClick={() => setVisibleFillter('active')}>Active</button>
            <button disabled={ filter === 'completed' } onClick={() => setVisibleFillter('completed')}>Completed</button>
        </div>
    )
}
 
export default Footer;