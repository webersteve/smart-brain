import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className='Tilt flex items-center justify-center br2 shadow-2' scale={1.2} tiltMaxAngleX={40} tiltMaxAngleY={40} style={{ height: 150, width: 150 }}>
    			<div className=''>
    				<img style={{}} alt ='logo' src={brain}/>
    			</div>
  		</Tilt>
		</div>
	);
}

export default Logo;