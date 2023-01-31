import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function withRestriction(Component) {
    return () => {
        const adminUser = useSelector((state) => state.adminUser.adminUser)
        const navigate = useNavigate()
        useEffect(() => {
            if (!adminUser) {
                return navigate("/")
               }
        }, [navigate, adminUser])
        if(!adminUser) { // dont show anything if no user

        return null
        }
        return (
        <>
        <Component/>
        {/* whatever we provide, to share the logic */}
        </>
        )
    }
}

export default withRestriction