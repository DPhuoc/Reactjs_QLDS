import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
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

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.editUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" name="email" value={this.state.email}
                                   onChange={(event) => this.handleOnChangeInput(event)}
                                   disabled/>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={(event) => this.handleOnChangeInput(event)}
                                   disabled/>
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
                    <Button className="px-2" color="primary" onClick={() => this.handleSaveUser()}>Save changes</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


