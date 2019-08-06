import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
// import FontPicker from "font-picker-react";
import {addText} from '../../store/actions/index'

import $ from 'jquery';


class FontSelector extends React.Component {
	state = {
		showModal: false,
		loading: false,
		input: '',
		activeFontFamily: "Open Sans"
	};

	showModal = () => {
		this.setState({showModal: true});
	}

	inputHandler = (event) => {
		this.setState({ input: event.target.value });
	};

	insertHandler = () => {
		this.setState({loading: true});
		this.props.addText(this.state.input);
		setTimeout(() => {
			this.props.insert();
			this.setState({loading: false, showModal: false});
			$('#inputModal').modal('hide');
		}, 500)
	};

	show = () => {
		this.setState({show: true});
	}

	render() {

		return (

				this.props.show &&
					<div>
						<div>
							<div className='row border '>
								<div className='col-md-6 '>
									<h6 className='text-left'>Font</h6>
								</div>
								<div className='col-md-6'>
									{/*<FontPicker*/}
									{/*	apiKey="AIzaSyBAJWzPR4-xgWPorqSzWqPCSReWht9733Q"*/}
									{/*	activeFontFamily={this.state.activeFontFamily}*/}
									{/*	onChange={nextFont =>*/}
									{/*		this.setState({*/}
									{/*			activeFontFamily: nextFont.family,*/}
									{/*		})*/}
									{/*	}*/}
									{/*/>*/}
									{/*<p className="apply-font">The font will be applied to this text.</p>*/}
								</div>
							</div>
							<button
								className="btn btn-danger mt-5"
								data-toggle="modal"
								data-target="#inputModal"
								onClick={this.showModal}
							>
								New text
							</button>
						</div>

						{/*Modal*/}

						<div
							className="modal fade"
							id="inputModal"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="inputModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="inputModalLabel">
											Text. Name. Numbers
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<input
											type="text"
											className="form-control"
											placeholder="Enter text, name, number here"
											onChange={this.inputHandler}
										/>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
										<button type="button "
												className={this.state.loading ? "btn btn-danger disabled" : "btn btn-danger"}
												onClick={this.insertHandler}>
											Insert
										</button>
									</div>
								</div>
							</div>
						</div>

					</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		show: state.designerReducer.fontSelector
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addText: (text) => dispatch(addText(text))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FontSelector) ;
