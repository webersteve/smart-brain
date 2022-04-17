import React from 'react';

const Register = ({ onRouteChange }) => {
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0 center">Register</legend>
			      <div className="mt3">
			      	<div className="center">
			        	<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        </div>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="text" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			      	<div className="center">
			        	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        </div>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			      	<div className="center">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        </div>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="center">
			      <input 
			      	onClick={() => onRouteChange('home')}
			      	className="br3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Register" />
			    </div>
			  </div>
			</main>
		</article>
	);
}

export default Register;