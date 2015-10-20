const Navigation = React.createClass({
	// functions that you can access anywhere where you are calling for Hello component
	render(){
		return (
			<nav id='globalNav'>
				<ul>
					<a href="#"><li>Navigation 1</li></a>
					<a href="#"><li>Navigation 2</li></a>
					<a href="#"><li>Navigation 3</li></a>
					<a href="#"><li>Navigation 4</li></a>
					<a href="#"><li>Navigation 5</li></a>
				</ul>
			</nav>
		);
	}
});