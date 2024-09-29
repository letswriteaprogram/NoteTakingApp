import React from 'react'

function Loader() {
  return (
    <section className="w-full min-h-60 min-w-60 h-full flex justify-center items-center">
        <div className='w-20 h-20 border-8 border-black border-t-transparent rounded-full animate-spin'></div>
    </section>
  
  )
}

export default Loader