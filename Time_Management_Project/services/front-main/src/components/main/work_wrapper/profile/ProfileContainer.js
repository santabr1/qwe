import {connect} from 'react-redux'
import Profile from './ProfileSide'
import * as selectors from '../../../../redux/selectors'
import {getProfile, changeAvatar} from '../../../../redux/reducers/profile_reducer'
import {updateDeveloper, deleteDeveloper} from '../../../../redux/reducers/developers_reducer'
import {logout} from '../../../../redux/reducers/auth_reducer'

function mapStateToProps(state) {
    return {
        profileInformation: selectors.profileInformationSelector(state),
        authId: selectors.authIdSelector(state),
        isAdmin: selectors.isAdminSelector(state),
        positionCodes: selectors.positionCodesSelector(state),
        specialtyCodes: selectors.specialtyCodesSelector(state)
    }
}

export default connect(mapStateToProps, {
    getProfile,
    updateDeveloper,
    deleteDeveloper,
    changeAvatar,
    logout
})(Profile)