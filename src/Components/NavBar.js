import './NavBar.css';
import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from 'react-router-dom'
import TodosPage from '../Pages/TodosPage';
import GuardedRoute from '../Auth/GuardedRoute';
import HookTestPage from '../Pages/HookTestPage';
import WeatherPage from '../Pages/WeatherPage';

export default function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function Login(){
        setIsAuthenticated(true);
    }
    
    function Logout() {
        setIsAuthenticated(false);
    }

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/todos'>Todos</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/hooks'>Hooks</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/weather'>Weather</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/protected'>protected</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active':'')} to='/unprotected'>unprotected</NavLink>
                    </li>
                    <li>
                        <button onClick={Login}>Login</button>
                    </li>
                    <li>
                        <button onClick={Logout}>Logout</button>
                    </li>
                </ul>
            </nav>
            
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/todos' element={< Todos />}></Route>
                <Route exact path='/hooks' element={< Hooks />}></Route>
                <Route exact path='/weather' element={< Weather />}></Route>
                <Route exact path='/unprotected' element={< UnProtected />} />
                <Route exact path="/protected" element={ <GuardedRoute isAuth = {isAuthenticated}> <Prot isAuth={isAuthenticated} /> </GuardedRoute> } />
            </Routes>
        </Router>
    );
}

function Prot() {
    return <h2>Protected</h2>
}

function UnProtected() {
    return <h2>UnProtected</h2>
}

function Home() {
    return <h2>Home</h2>;
}

function Todos() {
    return <TodosPage />;
}

function Hooks() {
    return <HookTestPage />;
}

function Weather() {
    return <WeatherPage />;
}
