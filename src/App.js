import React, { Component } from 'react'
import TodoListTemplate from './components/TodoListTemplate'
import Form from './components/Form'
import TodoItemList from './components/TodoItemList'
import Palette from './components/Palette'

export default class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [
      { id:0, text: ' 리액트 소개', checked: false },
      { id:1, text: ' 리액트 소개', checked: true },
      { id:2, text: ' 리액트 소개', checked: false },
    ],
    color: '#343a40'
  }

  //텍스트 내용이 바뀌면 state 업데이트
  handleChange = (e) => {
    this.setState({
      input : e.target.value //input의 바뀔값
    });
  }

  //버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트(리스트에 추가)
  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input : '', //input 비우고
      // concat을 사용하여 새로운 내용을 배열에 추가
      todos : todos.concat({
        id : this.id++,
        text : input,
        checked : false,
        color
      })
    });
  }

  //input에서 Enter를 누르면 버튼을 클릭한것과 동일한 작업진행
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter라면 handleCrate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  //체크를 하거나 푸는 함수
  handleToggle = (id) => {
    const { todos } = this.state;

    //파라미터로 받은 id로 몇번째 아이템인지 찾는다
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index] //선택한 객체

    const nextTodos = [...todos]; //배열을 복사

    //기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }
  

  render() {
    const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this; //비구조화 할당, 사용할때마다 this를 생략해도됨

    return ( 
      <TodoListTemplate 
        form={(
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            color={color}
        />)}
        palette={(<Palette colors={colors} selected={color} onSelect={handleSelectColor}/>)}
      >
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    )
  }
}
