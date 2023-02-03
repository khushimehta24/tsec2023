import React from 'react'
import SideDrawer from '../components/Sidebar/SideDrawer'

const LoadingPage = () => {
    return (
        <SideDrawer>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="https://media.giphy.com/media/rYIne3s0sf9du79AL4/giphy.gif" style={{ objectFit: 'cover',  width: '40%', display: 'block', height: '40%' }} />
        </div>
        </SideDrawer>
    )
}

export default LoadingPage