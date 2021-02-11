import React, { useState } from 'react';


const ReadBook = ({book}) => {


  return (
    <div className="read-book">
        <p>{book}</p>
    </div>
  );
}

export default ReadBook;