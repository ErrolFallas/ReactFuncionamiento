import React from 'react'
import { useState } from 'react' /* obligatorio para usar Hook del tipo useState, permite renderizar otra vez, tras cada cambio en la experiencia del usuario */
import { Link, useNavigate } from 'react-router-dom';

function Navi() {

    const navigate = useNavigate()
    const [userLogeado, setUserLogeado] = useState(
        JSON.parse(localStorage.getItem("usuarioLogueado"))
    )

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioLogueado")
        setUserLogeado(null) /* actualizar nav tras cerrarSesion, perfecto si estas en home y cierras seccion, se espera que sigas en home, pero la nav debe cambiar */
        navigate("/") // redirige al login 
    }


    let contenidoNav
    if (userLogeado) {
        contenidoNav = (
            <>
                <Link to={"/PerfilUsuario/"}>Usuario</Link>
                <Link to="/Formulario">Contact</Link>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
            </>
        )
    } else {
        contenidoNav = (
            <>
                <Link to="/">Login</Link>
                <Link to="/Formulario">Contact</Link>
            </>
        )
    }



    return (
        <div className="nav-container">
            <header className="nav-header">
                <nav className="nav-menu">

                    <div className="nav-links">
                        {contenidoNav}
                    </div>

                </nav>
            </header>
        </div>
    )
}

export default Navi
