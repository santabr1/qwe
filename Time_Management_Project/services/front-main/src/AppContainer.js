import {connect} from 'react-redux'
import React, {useState} from 'react'
import App from './App'
import * as selectors from './redux/selectors'
import {auth} from './redux/reducers/auth_reducer'

function AppContainer(props) {

    const {authId, auth} = props
    const [loading, setLoading] = useState(false)


    function onSubmitAuth(values) {
        setLoading(true)
        auth(values.login, values.password)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }


    return <App
        authId={authId}
        loading={loading}
        onSubmitAuth={onSubmitAuth}
    />
}

function mapStateToProps(state) {
    return {
        authId: selectors.authIdSelector(state)
    }
}

export default connect(mapStateToProps, {
    auth
})(AppContainer)