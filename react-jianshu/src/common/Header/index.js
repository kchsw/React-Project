import React, { Component }from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { searchFocus, getList, mouseEnter, mouseLeave, changePage } from './store/actionCreators'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style'
class Header extends React.Component {
    getListArea = () => {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
        const pageList = list.toJS().slice((page - 1) * 10, page * 10)
        if(focused || mouseIn){
            return (
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>                     
                        {
                            pageList.map(item => {
                                return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                            })
                            // [
                            //     <SearchInfoItem>0</SearchInfoItem>,
                            //     <SearchInfoItem>2</SearchInfoItem>
                            // ]
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        }else{
            return null
        }
    }
    render() {
        const { focused, list, handleInputFocus } = this.props
        return (  
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    <NavItem className="right">登陆</NavItem>
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames='slider'
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={() => handleInputFocus(list.toJS())}  
                                onBlur={() => handleInputFocus(list.toJS())}                      
                            ></NavSearch>
                        </CSSTransition>    
                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
                        {this.getListArea()}
                        {/* <SearchInfo>
                            <SearchInfoTitle>
                                热门搜索
                                <SearchInfoSwitch>换一批</SearchInfoSwitch>
                            </SearchInfoTitle>
                            <SearchInfoList>
                                <SearchInfoItem>教育</SearchInfoItem>
                                <SearchInfoItem>教育</SearchInfoItem>
                                <SearchInfoItem>教育</SearchInfoItem>
                                <SearchInfoItem>教育</SearchInfoItem>
                                <SearchInfoItem>教育</SearchInfoItem>
                                <SearchInfoItem>教育</SearchInfoItem>
                            </SearchInfoList>
                        </SearchInfo> */}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className="writting">
                        <i className="iconfont">&#xe615;</i>
                        写文章
                    </Button>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list){   
            if(!list.length){                        
                dispatch(getList())
            }    
            dispatch(searchFocus())
        },
        handleMouseEnter(){
            dispatch(mouseEnter())
        },
        handleMouseLeave(){
            dispatch(mouseLeave())
        },
        handleChangePage(page, totalPage, spin){
            let rotateAngle = parseInt(spin.style.transform.replace(/[^0-9]/ig, ''), 10) || 0
            spin.style.transform = `rotate(${ rotateAngle + 360 }deg)`
            if(page < totalPage){
                dispatch(changePage(page + 1))
            }else{
                dispatch(changePage(1))
            }
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header) 