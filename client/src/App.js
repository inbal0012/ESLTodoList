import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import simpleStr, { debruijn, smartStr } from './SafeString';

import TodosList from './components/todos-list.component';
import EditTodo from './components/edit-todo.component';
import CreateTodo from './components/create-todo.component';
import logo from './images/to-do-list-clip.png';

function App() {
  simpleStr();
  smartStr();
  debruijn('0123456789', 4);

  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a
            className='navbar-brand'
            href='https://github.com/inbal0012/ESLTodoList'
            target='_black'
          >
            <img
              src={logo}
              width='25'
              height='30'
              alt='Project Github Repository'
            />
          </a>
          <Link to='/' className='navbar-brand'>
            ESL Todo App
          </Link>
          <div className='nav-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='navbar-item'>
                <Link to='/' className='nav-link'>
                  Todos
                </Link>
              </li>
              <li className='navbar-item'>
                <Link to='/create' className='nav-link'>
                  Create Todo
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path='/' exact component={TodosList} />
        <Route path='/edit/:id' exact component={EditTodo} />
        <Route path='/create' exact component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
