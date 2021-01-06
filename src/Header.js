import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
    return (
        <StyledMainDiv1 className='App'>
            <header>
                <h1>
                    <Link to='/'>Scribble</Link>
                </h1>
            </header>
            <nav>
                <StyledDiv2>
                    <StyledDiv1>
                        <li>
                            <Link to='/myportfolio'>My Portfolio</Link>
                        </li>
                        <li>
                            <Link to='/music'>Music</Link>
                        </li>
                        <li>
                            <Link to='/art'>Art</Link>
                        </li>
                        <li>
                            <Link to='/parttime'>Part-Time Job</Link>
                        </li>
                    </StyledDiv1>
                    <StyledDiv1>
                        <li>김기원(힙합 작곡가)</li>
                        <li>
                            <Link to='dm'>DM</Link>
                        </li>
                    </StyledDiv1>
                </StyledDiv2>
            </nav>
        </StyledMainDiv1>
    );
}

const StyledMainDiv1 = styled.div`
    border: transparent;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 2px 2px 10px 0.2px;
    min-width: 350px;
`;

const StyledDiv1 = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: transparent;
    border-radius: 8px;
    min-width: 330px;
    padding: 10px;
    box-shadow: 2px 2px 10px 0.2px;
`;

const StyledDiv2 = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;
