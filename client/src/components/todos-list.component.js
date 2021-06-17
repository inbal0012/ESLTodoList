import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerUrl from '../typesAndConsts';
import editImg from '../images/edit.png';
import { Form } from 'react-bootstrap';

const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_priority}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.date}
    </td>
    <td>
      <Link to={'/edit/' + props.todo._id} style={{ marginRight: 20 }}>
        <button>
          <img src={editImg} width='15' height='15' alt='Edit' />
        </button>
      </Link>
      <button
        onClick={(e) => {
          axios
            .delete(ServerUrl + props.todo._id)
            .then((res) => {
              props.deleteTodo(props.todo._id);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        X
      </button>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);
    //this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {
      todos: [],
      search: '',
      searchBy: 'Description',
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if ({ ...this.state } !== { ...prevState }) this.getDataFromServer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) return false;
    else return true;
  }

  getDataFromServer() {
    axios
      .get(ServerUrl)
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo._id !== id),
    });
  }
  onChangeSearch(e) {
    this.setState({ search: e.target.value });
  }

  todoList() {
    var filteredTodos = this.state.todos;
    if (!this.state.search.toLowerCase().match(/^ *$/)) {
      filteredTodos = filteredTodos.filter((todo) => {
        if (this.state.searchBy === 'Description')
          return todo.todo_description
            .toLowerCase()
            .includes(this.state.search);
        else if (this.state.searchBy === 'Responsible')
          return todo.todo_responsible
            .toLowerCase()
            .includes(this.state.search);
        else if (this.state.searchBy === 'Priority')
          return todo.todo_priority.toLowerCase().includes(this.state.search);
        else if (this.state.searchBy === 'Date')
          return todo.date.includes(this.state.search);
      });
    }
    console.log('///');
    return filteredTodos.map((currTodo, index) => {
      return <Todo todo={currTodo} key={index} deleteTodo={this.deleteTodo} />;
    });
  }

  onChangeSelection(e) {
    this.setState({ searchBy: e.target.value });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-4 '>
              <div class='input-group'>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Search for...'
                  value={this.state.search}
                  onChange={this.onChangeSearch.bind(this)}
                />
                <Form.Control
                  as='select'
                  custom
                  onChange={this.onChangeSelection.bind(this)}
                >
                  <option value='Description'>Description</option>
                  <option value='Responsible'>Responsible</option>
                  <option value='Priority'>Priority</option>
                  <option value='Date'>Date</option>
                </Form.Control>
              </div>
            </div>
          </div>
        </div>
        <table
          className='table table-striped table-responsive'
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
