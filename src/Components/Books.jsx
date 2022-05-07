import React from 'react';
import Book from './Book';
import "./books.css";

const Books = ({data}) => {

  return (
    <div className='books'>
        {data.items.map((book,index)=>(
            <Book book={book} key={index}/>
        ))}
    </div>
  )
}

export default Books;