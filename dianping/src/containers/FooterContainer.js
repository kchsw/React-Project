import { connect } from 'react-redux'
import Footer from '../components/Footer'
import { setFilter } from '../store/actionCreators'
import { getFilter } from '../store/selectors'

const mapStateToProps = (state) => {
    return {
        filter: getFilter(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setVisibleFillter(filter) {
            dispatch(setFilter(filter))
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Footer) 