import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import './UserManage.scss'
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                return true;
            }
        } catch (err) {
            console.error(err)
        }
        return false;
    }

    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        // let arrUsers = this.state.arrUsers;
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser && <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className="title text-center">
                    Manage users with react
                </div>
                <div>
                    <button
                        className="btn btn-primary mx-3 px-2"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus px-2"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-4 mx-3">
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleEditUser(user)}><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
