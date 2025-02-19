import React from 'react'

import './Author.scss'
import { Link } from 'react-router-dom'

const Author = ({id,userName})=>{
  return (
    <Link className='author' to={`/user-posts/${id}`}>
    <span>Автор </span>
    <span className='author__name'>{ userName}</span>
    </Link>
  )
}

export default Author