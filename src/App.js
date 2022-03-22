import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';
import { call } from "./service/ApiService";

class App extends React.Component {
// 3-39
componentDidMount() {
  call("/todo", "GET", null).then((response) =>
    this.setState({items:response.data})
  );
}

// 3-11
  constructor(props) {
    super(props);
    // (1) items 배열로
    this.state = {
      items: [],
    };
  }

// 3-18
add = (item) => {
  call("/todo", "POST", item).then((response) =>
    this.setState({items:response.data})
  );
};

// 3-24
delete = (item) => {
  call("/todo", "DELETE",item).then((response) => 
    this.setState({items:response.data})
  );
};

// 3-44
update = (item) => {
  call("/todo","PUT",item).then((response) =>
    this.setState({items:response.data})
  );
};

// 3-8, 3-9, 3-12, 3-14, 3-16
  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
          ))}
        </List>
      </Paper>
    );

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )

  }
}

export default App;
