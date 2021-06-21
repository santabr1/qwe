import Aside from './Aside'
import {connect} from 'react-redux'
import * as selectors from '../../../redux/selectors'


function mapStateToProps(state) {
    return { accessRight: selectors.isAdminSelector(state) }
}

export default connect(mapStateToProps, {})(Aside)