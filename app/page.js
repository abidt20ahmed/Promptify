import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <div className='container mx-auto'>
      <div className='heading blue_gradient'>Prompt Your Mind</div>
      <p className='desc mx-auto'>Unleash creativity with Promptify. Save, organize, and find inspiration effortlessly. Elevate your ideas – start now!</p>
      <Feed />
    </div>

  )
}

export default Home