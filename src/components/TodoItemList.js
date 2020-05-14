import React, { Component } from 'react'
import TodoItem from './TodoItem';

export default class TodoItemList extends Component {
    
    //최적화
    //컴포넌트가 리렌더링을 할지말지 정해줌
    //따로 구현하지 않으면 언제나 true를 반환
    shouldComponentUpdate(nextProps, nextState){
        return this.props.todos !== nextProps.todos;
    }

    render() {
        // todos : todo 객체들이 들어있는 배열
        // onToggle : 체크박스를 켜고 끄는 함수
        // onRemove : 아이템을 삭제시키는 함수
        const { todos, onToggle, onRemove } = this.props;

        //객체배열을 컴포넌트 배열로 변환
        const todoList = todos.map(
            ({id, text, checked, color}) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    color={color}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        );

        // {...todo} 라고 넣어주면, 내부의 값딜이 모두 자동으로 props로 설정됨
        // const todoList = todos.map(
        //     (todo) => (
        //       <TodoItem
        //         {...todo}
        //         onToggle={onToggle}
        //         onRemove={onRemove}
        //         key={todo.id}
        //       />
        //     )
        //   );

        return (
            <div>
                {todoList}
            </div>
        )
    }
}
