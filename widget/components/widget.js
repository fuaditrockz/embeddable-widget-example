import React from 'react'
import './widget.css'

import Modal from './modal'
import Config from '../config';

const widgetName = Config.name;

class Widget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				message: null,
				showModal: false
		};

		this.clickShowModal = this.clickShowModal.bind(this);
		this.clickCloseModal = this.clickCloseModal.bind(this);
	}

	clickShowModal() {
		this.setState({ showModal: true });
	}

	clickCloseModal() {
		this.setState({ showModal: false })
	}

	render() {
		const { showModal } = this.state
		console.log(showModal)
		return (
			<div className='widget-container'>
				<Modal show={showModal} handleClose={this.clickCloseModal}>
					<h4>Hello World</h4>
				</Modal>
				<div>
					<button className='button' onClick={this.clickShowModal}>
						React Modal
					</button>
				</div>
			</div>
		)
	}

	setMessage(message){
		this.setState({message: message});
	}
};

export default Widget;