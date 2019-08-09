import React, { Component } from 'react';
import {
    RecommendWrapper
} from '../style'
class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <RecommendWrapper>
                {/* <RecommendItem imgUrl="https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"/> */}
                <img className="rec-img" src="https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"/>
                <img className="rec-img" src="https://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"/>
                <img className="rec-img" src="https://cdn2.jianshu.io/assets/web/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"/>
                <img className="rec-img" src="https://cdn2.jianshu.io/assets/web/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png"/>
            </RecommendWrapper>
        );
    }
}
 
export default Recommend;