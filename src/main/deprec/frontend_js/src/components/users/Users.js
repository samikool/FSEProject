import React, {Component} from 'react'
import './Users.css'


class Users extends Component{
    constructor(){
        super();
        this.state={
            users: []
        }
    }

    componentDidMount(){
        fetch('/api/users')
            .then(res => res.json())
            .then(users => this.setState({users},()=>{console.log('Fetch..', users)}));
    }

    render(){
        return (
            <div>
                <h2>Users</h2>
                <ul>
                    {this.state.users.map(users =>
                        <li key={users.id}> {users.firstName} {users.lastName} </li>
                    )}
                </ul>
            </div>

        );
    }
}

export default Users;