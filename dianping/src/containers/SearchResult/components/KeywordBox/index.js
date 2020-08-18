import React from 'react';
import './index.css'
import { Link } from "react-router-dom";

const KeywordBox = (props) => {
    const { text } = props
    return (  
        <div className="keywordBox">
            <Link to="/search" className="keywordBox__text">
                {text}
            </Link>
        </div>
    );
}
 
export default KeywordBox;