import React, { useState, useEffect } from 'react'

const Pagination = (props) => {
    const [first, setFirst] = useState(false)
    const array = Array.from({ length: props.total }, (_, i) => i + 1)

    let newArray = array.slice(
        (props.page <= 1 ? 0 : props.page - 2),
        (props.page >= array.length ? array.length : props.page + 1)
    )

    useEffect(() => {
        if (newArray[1] > 2) {
            setFirst(true)
        } else {
            setFirst(false)
        }
    }, [newArray])


    return (
        <div>
            {
                first ?
                    <>
                        <span className='btn btn-outline-success mx-1' onClick={() => props.callback(1)}>1</span>
                        <span className=' mx-1'>...</span>
                    </>
                    : null
            }
            {
                newArray.map(index => {
                    if (index === props.page) {
                        return <span className='btn btn-success mx-1' key={index} onClick={() => props.callback(index)}>{index}</span>
                    } else {
                        return <span className='btn btn-outline-success mx-1' key={index} onClick={() => props.callback(index)}>{index}</span>
                    }
                })
            }
            <span className=' mx-1'>...</span>
            <span className='btn btn-outline-success mx-1' onClick={() => props.callback(array.length)}>{array.length}</span>
        </div>
    )
}

export default Pagination