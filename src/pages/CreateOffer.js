import React, { useContext } from 'react'
import CreateProperty from '../components/createProperty/CreateProperty'
import SideDrawer from '../components/Sidebar/SideDrawer'
import { offerContext } from '../offerContext'


const CreateOffer = ({ loadWeb3 }) => {
    const { user } = useContext(offerContext)
    return (
        <SideDrawer currentUser={user} loadWeb3={loadWeb3}>
            <CreateProperty/>
        </SideDrawer>
    )
}

export default CreateOffer