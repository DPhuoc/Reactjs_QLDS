import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i of arrInput) {
            if (!this.state[i]) {
                isValid = false;
                alert(`Missing parameter: ${i}`);
                break;
            }
        }
        return isValid
    }

    handleAddNewUser = async () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            let check = await this.props.createNewUser(this.state);
            if (check === true) {
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                })
            }
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" name="email" value={this.state.email}
                                   onChange={(event) => this.handleOnChangeInput(event)}/>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={(event) => this.handleOnChangeInput(event)}/>
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={this.state.firstName}
                                   onChange={(event) => this.handleOnChangeInput(event)}/>
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={this.state.lastName}
                                   onChange={(event) => this.handleOnChangeInput(event)}/>
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text" name="address" value={this.state.address}
                                   onChange={(event) => this.handleOnChangeInput(event)}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-2" color="primary" onClick={() => this.handleAddNewUser()}>Add new</Button>
                    <Button className="px-2" color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


