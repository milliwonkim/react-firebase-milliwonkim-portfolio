import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from 'firebase';
import { firebase } from '../firebase';

export default function Portfolio() {
    const [goal, setGoal] = useState('');

    const addTask = () => {
        firebase
            .firestore()
            .collection('tasks')
            .add({
                goal: goal,
            })
            .then(() => {
                setGoal('abc');
            });
    };

    return (
        <div>
            <h1>추가하기</h1>
            <button>
                <Link to='/add_portfolio'>추가하기</Link>
            </button>
            <h1>약력</h1>
            <div className='summaryBorder'>
                {goal}
                목표: 추가하기에서 글써서 여기에 글쓰기
                <input onChange={(e) => setGoal(e.target.value)} />
                <button onClick={addTask}>Setting Goal</button>
            </div>
        </div>
    );
}
