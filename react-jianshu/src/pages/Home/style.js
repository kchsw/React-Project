import styled from 'styled-components'
import { tsPropertySignature } from '@babel/types';

export const HomeWrapper = styled.div`
    width: 960px;
    overflow: hidden;
    margin: 0 auto;
`

export const HomeLeft = styled.div`
    margin-left: 15px;
    width: 625px;
    padding-top: 30px;
    float: left;
    .banner-img{
        width: 625px;
        height: 270px;
    }
`

export const HomeRight = styled.div`
    width: 280px;
    float: right;
    padding-top: 30px;
`
export const TopicWrapper = styled.div`
    padding: 20px 0 10px 0;
    overflow: hidden;
    margin-right: -18px;
    border-bottom: 1px solid #f0f0f0;
`
export const TopicItem = styled.div`
    float: left;
    height: 32px;
    line-height: 32px;
    background: #f7f7f7;
    font-size: 14px;
    color: #000;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding-right: 10px;
    margin: 0 18px 18px 0;
    .topic-pic{
        height: 32px;
        width: 32px;
        display: block;
        float: left;
        margin-right: 10px;
    }
`
export const TopicMore = styled.a.attrs({
    href: '/'
})` 
    text-decoration: none;
    display: block;
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    color: #000;
`
export const ListWrapper = styled.div`

`

export const ListItem = styled.div`
    position: relative;
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
    .list-img{
        width: 150px;
        position: absolute;
        top: 50%;
        margin-top: -60px;
        right: 0;
        width: 150px;
        height: 100px;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
    }
`

export const ListInfo = styled.div`
    padding-right: 165px;
    h3{
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        color: #333;
    }
    p{
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #999;
    }
`

export const RecommendWrapper = styled.div`
    margin-top: -4px;
    padding-bottom: 4px;
    min-height: 228px;
    .rec-img{   
        width: 100%; 
        min-height: 50px;
        margin-bottom: 6px;
        border-radius: 4px;  
    }
`

export const RecommendItem = styled.div`
    background: url(${props => tsPropertySignature.imgUrl});
    background-size: contain;
`