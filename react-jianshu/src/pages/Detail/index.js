import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getDetailData } from './store/actionCreators'
import { withRouter } from 'react-router-dom'
import {
    DetailWrapper,
    Header,
    Content
} from './style'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                <Content dangerouslySetInnerHTML={{__html: this.props.content}}>
                   {/* <img src='https://upload-images.jianshu.io/upload_images/8107105-81753bfa5adf55f1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/640/format/webp'/>
                   <p>
                   相信很多人喜欢吃包菜，包菜有的地方叫做卷心菜也有叫大头菜的，反正我们这里是叫包菜的，为什么包菜这么多人喜欢吃呢？还不是因为它的口味甜美，口感爽口好吃，包菜的吃法也有很多种，其中我最喜欢的就是拿来炒着吃，或者把包菜腌制成酸菜来吃，用包菜腌制的酸菜味道非常的棒，想想都流口水了。
                   </p>
                   <p>
                   大家吃包菜的时候不知道是否能吃出一丝淡淡的青草香，这可能就是包菜特有的香味吧，很多人炒包菜喜欢炒的很熟，这样吃起来虽然味道要好一点，但是已经没有原来包菜的那种爽脆的口感了。
                   </p> */}
                </Content>
            </DetailWrapper>
        )
    }
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id)
    }
}

const mapState = (state) => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
})

const mapDispatch = (dispatch) => ({
    getDetail(id){
        dispatch(getDetailData(id))
    }
})
 
export default connect(mapState, mapDispatch)(withRouter(Detail));