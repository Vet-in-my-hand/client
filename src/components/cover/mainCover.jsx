import './mainCover.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MainCover() {
    const navigate = useNavigate()
    const [is, setIs] = useState(false)
    
    const clickHandler = () => { navigate('/login') }
    const overHandler = () => { setIs(true) }
    const outHandler = () => { setIs(false) }
        
    return(
        <div >
            <div className='warp'>
                <img 
                    className='img' 
                    alt='main' 
                    src='img/main.jpg' 
                    onClick={clickHandler} 
                    onMouseOver={overHandler}
                    onMouseOut={outHandler}
                ></img>
            </div>
            {
                is ?          
                    <div>
                        <img className='sub' alt='sub2' src='img/sub2.png' ></img>
                    </div>
                    :
                    <div>
                        <img className='sub' alt='sub1' src='img/sub1.png' ></img>
                    </div>
            }
        </div>
    )
}

export default MainCover