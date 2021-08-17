import React from 'react'

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        const todoObject = {
            text: value,
            isCompleted: false
        }
        addTodo(todoObject);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

export default TodoForm