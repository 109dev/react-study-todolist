import React, { Component } from 'react'
import './TodoItem.css';

export default class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render() {
        // text : todo 내용
        // checked : 체크박스상태
        // id :  todo의 고유아이디
        // onToggle : 체크박스를 켜고 끄는 함수
        // onRemove : 아이템을 삭제시키는 함수
        const { text, checked, id, color, onToggle, onRemove } = this.props;
        
        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" 
                     onClick={(e) => {
                        e.stopPropagation(); //onToggle이 실행되지 않도록 함
                        onRemove(id)}
                    }> 
                    &times;
                </div>
                {/* <div className={`todo-text ${checked && 'checked'}`}> */}
                <div style={{ color }} className={`todo-text ${ checked ? ' checked' : '' }`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        )
    }
}
