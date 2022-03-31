import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo.js';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from "./service/ApiService";

class App extends React.Component {

  // 3-11
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading:true,
    };
  }

  // 3-39
  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({items:response.data, loading:false})
    );
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

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant='h6'>* CHECKLIST *</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                LOGOUT
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // 로딩중이 아닐때 렌더링할 부분
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
            <AddTodo add={this.add} />
            <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    // 로딩중일때 렌더링할 부분
    var loadingPage = <h1>로딩중...</h1>;
    var content = loadingPage;
    if(!this.state.loading) {
      //로딩중이 아니라면 todoListPage를 선택
      content = todoListPage;
    }

    // 선택한 content 렌더링
    return <div className='App'>{content}</div>;

  }
}

export default App;
