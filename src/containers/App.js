import React, { Component } from 'react';
import './App.css';
import TsParticles from '../components/TsParticles/TsParticles';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
 apiKey: '3bd26a36f8b848e598078de6afce9f31'
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signIn',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({user:{
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onPictureSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => {
				if(response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}))
					})
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(error));
	}

	onRouteChange = (route) => {
		if (route === 'signIn') {
			this.setState({isSignedIn: false});
		} else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state
		const { name, entries } = this.state.user
		return (
			<div className="App">				
				<TsParticles />	
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{ route === 'home'
				 	?	<div>
							<Logo />
							<Rank name={name} entries={entries}/>
							<ImageLinkForm 
								onInputChange={this.onInputChange} 
								onPictureSubmit={this.onPictureSubmit} 
							/>
							<FaceRecognition box={box} imageUrl={imageUrl} />
						</div>
				 	: (
				 			route === 'signIn' 
				 			? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				 			: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
				 		)

				 	
						
				}
			</div>
		);
	}
}

export default App;