import Router from 'next/router'
import { withRouter } from 'next/router'
import axios from 'axios'
const handleRouteChange = url => {
    console.log('App is changing to :', url)
}
Router.events.on('routeChangeStart', handleRouteChange)
//全部页面都会触发

function gotoWxamplePage(){
    Router.push({
        pathname: '/example',
        query: {
            from: 'about'
        }
    })
}
const about = ({router, list}) => (
    
    <>
        <h1>About {router.query.id} Page</h1>
        <h4>Click <span onClick={() => {gotoWxamplePage()}}>here</span> to Idnex page</h4>
        {
            list.map(item => (
                <span key={item}>{item}</span>
            ))
        }
        <style jsx>{`
            span {
                color: blue;
                text-decoration: underline;
            }
        `}</style>
    </>
)

about.getInitialProps = async () => {
    const res = await axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    return res.data.data
}



export default withRouter(about)