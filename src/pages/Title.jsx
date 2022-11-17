

import './Title.css'

import { useState } from 'react';


const Title = ({flipPage}) => {

    const [start, setStart] = useState('title-start')

    const toggleStartClass = (event) =>{
        if (start === 'title-start') {
            setStart('title-start-clicked')
        } else  {
            setStart('title-start')
            flipPage(1)
        } 
    }

    return (
        <div className={"title-content"} >
            <div className='title-title' >
                <div>Path of</div>
                <div>Peril</div>
            </div>
            <div className='title-title-img' >
                <img src='assets/fighting.png' />
            </div>
            <div className='title-start-height' >
                <div onPointerDown={ toggleStartClass } onPointerUp={ toggleStartClass }  className={start}>
                    <div>Start</div>
                </div>
            </div>
        </div>
    )
 
}

export default Title



 