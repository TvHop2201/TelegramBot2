import React, { useState, useEffect } from 'react'

const Pagination = (props) => {

    const array = Array.from({ length: props.total }, (_, i) => i + 1)
    return (
        <div>
            {
                array.map(index => (
                    <span className='btn btn-outline-success mx-1' key={index} onClick={() => props.callback(index)}>{index}</span>
                ))
            }
        </div>
    )
}

export default Pagination