import React from 'react'

import './Author.scss'

const Author = ({id,userName})=>{
  return (
    <div className='author' >
    <span>Автор </span>
    <span className='author__name'>{ userName}</span>
    </div>
  )
}

export default Author