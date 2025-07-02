import React, {useState} from "react";

function TodoInput({ onAdd }) {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập công việc..."
        />
        <button type="submit">Thêm</button>
        </form>
    );
}

export default TodoInput;