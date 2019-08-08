import styled from 'styled-components'

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
    width: 240px;
    float: right;
`
export const TopicWrapper = styled.div`
    padding: 20px 0 10px 0;
    overflow: hidden;
    margin-right: -18px;
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