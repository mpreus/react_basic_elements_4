/* 
TicketShop is a main component, while OrderForm is a child component
*/
/* checkbox in TicketShop may be changed, thus we need class component, 
while there is no change in the OrderForm component - functional component */

/* text to render in 'displayMessage' method */
const ValidationMessage = (props) => <p>{props.txt}</p>; 

/* functional component with props */
const OrderForm = (props) => ( 
	<form onSubmit={props.submit}> 
		<input type="checkbox" id="age" onChange={props.change} checked={props.isConfirmed} />  
	{/* input initially unchecked */}
{/* 'id' in 'input' along with 'htmlFor' in 'label' connect both - cklick anywhere on the label to change the checkbox */}
		<label htmlFor="age">I'm over 16</label>
		<br/>
		<button type="submit">Buy a ticket</button>
	</form>
)

class TicketShop extends React.Component {
	state = {
		isConfirmed: false, 		/* checkbox initially unchecked */
		isFormSubmitted: false		/* initially not validated */
	}

	handleCheckboxChange = () => {
		this.setState({ 	
			isConfirmed: !this.state.isConfirmed, /* change to opposite state */
			isFormSubmitted: false,
		})
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		if (!this.state.isFormSubmitted) {
				this.setState({
					isFormSubmitted: true
				})
		}
	}	

	displayMessage = () => { 				/* if the button not clicked - there is no message */
		if (this.state.isFormSubmitted) { /* if submitted, go further */
			if (this.state.isConfirmed) { /* if age confirmed, return 'agreed' */
				return <ValidationMessage txt="You can watch the film!" />
			}
			else {
				return <ValidationMessage txt="You cannot watch the film if you're under 16." /> 
			} /* if age unconfirmed, 'not agreed' */
		}
		else { 
			return null
		}
	}
	
	render() {
		/* value of 'isConfirmed' extracted by destructuring */
		const { isConfirmed } = this.state; /* now we have const isConfirmed = false */
		return (
			<React.Fragment>
				<h1>Grab a ticket for horror film of the year!</h1>
			{/* 'props' for the component: */}
				 <OrderForm 
				 	change={this.handleCheckboxChange} 
				 	submit={this.handleFormSubmit} 
				 	checked={isConfirmed}
				 	/>
			{/* conditionally display the message: */}
				{ this.displayMessage() } 
			</React.Fragment> 				/* without 'this' react seeks (unsuccessfully) in the global context */
		)
	}
}

ReactDOM.render(
	<TicketShop />,
	document.getElementById("root")
)