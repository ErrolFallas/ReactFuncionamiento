import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PanelRegistro from "../pages/PanelRegistro.jsx";
import PerfilUsuario from '../pages/PerfilUsuario.jsx';
import LoginUsuario from '../pages/LoginUsuario.jsx';
import Navi from '../components/Navi.jsx'

const Routing = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginUsuario />} />
                <Route path='/RegistroUsuario' element={<PanelRegistro />} />
                <Route path="/PerfilUsuario/" element={<PerfilUsuario />} />


            </Routes>
        </Router>
    )
}

export default Routing
