import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200
    flex justify-between
     items-center h-14'>
        <div className="logo text-2xl font-bold">  
          <span className='text-green-500' >&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
          </div>
        
           
           


        


        <button  className= ' ring-black ring-1 text-black text-lg font-bold bg-green-400 rounded-xl m-10 my-5 gap-4 flex justify-center items-center'>
          <img className=' w-10 p-1' src="github.svg" alt="" />
            <a href=' https:/github.com/mayankthawani'> GitHub</a> 
        </button>

    </nav>
  )
}

export default Navbar
