import React from 'react'
import TopBar from '../layout/TopBar'
import NavBar from './NavBar'

const Header = () => {
  return (
    <div className='border-b border-gray-200'>
        {/*TopBar*/}
        <TopBar />
        <NavBar />
        {/* CartDrawer */}
    </div>
  )
}

export default Header