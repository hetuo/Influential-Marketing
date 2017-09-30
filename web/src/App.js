import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      title : 'Welcome to sign up',
      users : []
    }
  }


  componentDidMount(){
    var that = this;
    const url = 'http://localhost:3000/api/users';
    console.log('componente has mounted');

    fetch(url)
      .then(response => response.json())
      .then( json => {
        that.setState({
          users:json
        })
      })
      .catch( error => console.log('Error Fetch : ' + error ))
  }


  removeCountry(id){
    var that = this;
    let users = this.state.users;
    let country = users.find(function(user){
      return user.id === id
    });

    var request = new Request('http://localhost:3000/api/remove/' + id, {
    method: 'DELETE'
    });

    fetch(request)
      .then( response => {
        users.splice(users.indexOf(user),1);
        that.setState({
          users : users
        })
        response.json()
          .then(function(data){
            console.log(data);
          })
      })
      .catch( error => console.log('Error Remove user Fetch : ' + error ));


      console.log(user);
  }


  adduser(event){
    var that = this;

    event.preventDefault();
    let user_data = {
      username : this.refs.username.value,
      password : this.refs.password.value,
      id : Math.random().toFixed(3)
    };

    var request = new Request('http://localhost:3000/api/new-user', {
      method: 'POST',
      headers: new  Headers({'Content-Type':'application/json'}),
      body: JSON.stringify(user_data)
    });

    fetch(request)
      .then(function(response){
        let users = that.state.users;

        users.push(user_data);

        that.setState({
              users: users
        })
        response.json()
          .then(function(data){
            })
          })
      .catch(function(err){
        console.log( 'Fetch Error addUser :-S', err);
      })

  }

  render() {
    let title = this.state.title;
    let users = this.state.users;

    return (
      <div className="App">
        <h1>{title}</h1>
        <form className="userForm">
          <input type="text" ref="username" placeholder="username"></input>
          <input type="text" ref="password" placeholder="password"></input>
          <button onClick={this.adduser.bind(this)}>Sign up</button>
          {/* <pre>{JSON.stringify(users)}</pre> */}
        </form>

        <ul>
          {users.map(user => <li key={user.id}> {user.username} {user.password}
             <button onClick={this.removeuser.bind(this, user.id)}>Remove</button> </li>)}

        </ul>

      </div>
    );
  }
}

export default App;
