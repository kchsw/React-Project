import React, { Component } from 'react';
import './index.css'
import LikeItem from '../LikeItem'
import Loading from '../../../../components/Loading'

// const Likelist = () => {
//     const data = dataSource
//     return (  
//         <div className="likeList">
//             <div className="likeList__header">猜你喜欢</div>
//             <div className="likeList__list">
//                 {
//                     data.map((item, index) => {
//                         return (
//                             <LikeItem key={item.id} data={item}/>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     );
// }

class Likelist extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.removeListener = false
    }

    
    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop ||
        document.body.scrollTop
        const screenHeight = document.documentElement.clientHeight
        const likeListTop = this.myRef.current.offsetTop
        const likeListHeight = this.myRef.current.offsetHeight
        if(scrollTop >= likeListHeight + likeListTop - screenHeight) {
            // const newData = this.state.data.concat(dataSource)
            // const newLoadTimes = this.state.loadTimes + 1
            // setTimeout(() => {
            //         this.setState({
            //         data: newData,
            //         loadTimes: newLoadTimes
            //     })
            // }, 1000)
            this.props.fetchData()
        }
    }
    
    componentDidMount() {
        if(this.props.pageCount < 3) {
            document.addEventListener('scroll', this.handleScroll)
        }else {
            this.removeListener = true
        }
        if(this.props.pageCount === 0) {
            this.props.fetchData()
        }
    }

    componentDidUpdate() {
        if(this.props.pageCount >= 3 && !this.removeListener) {
            document.removeEventListener('scroll', this.handleScroll)
            this.removeListener = true
        }
    }

    componentWillUnmount() {
        if(!this.removeListener) {
            document.removeEventListener('scroll', this.handleScroll)
        }
    }

    render() { 
        // const data = dataSource
        const { pageCount, data } = this.props
        return (  
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return (
                                <LikeItem key={index} data={item}/>
                            )
                        })
                    }
                </div>
                {
                    pageCount >= 3 ?
                    (
                        <a href="_" className="likeList__header ">查看更多</a>
                    ) : (
                        <Loading />
                    )
                }
            </div>
        );
    }
}
 
 
export default Likelist;
 
