import React, { useState } from 'react'
import ServicesUsuario from '../services/ServicesUsuario.jsx'
/* import { useState } from 'react' */
import { useEffect } from 'react' /* manipular información del componente */
/* import Swal from 'sweetalert2'; */
import { Link } from 'react-router-dom';

function MostrarUsuario() {
    const [usuarios, setUsuarios] = useState([]) /* va recibir productos del servidor, que va caer en un array vacio */
    useEffect(() => {/* obligatorio siempre y Aqui declara un funcion y el efecto de usos será a lo que apunta la flecha*/
        async function CargarUsuario() {
            const datosUsuario = await ServicesUsuario.getUsuario()
            setUsuarios(datosUsuario) /* con este set, cambia el valor del set anterior que era array vacio, lo cambia ahora a los datos del servidor */
        }
        CargarUsuario()/* para que aparezca cada que entre a la página */
    }, []) /* SUPER OBLIGATORIO, para evitar que se congele la pagina, con esto le explica que estructura va usar */


    return (
        <div className="usuarios-container">

        <main className="usuarios-main">

            <section className="usuarios-section">
                {usuarios.map((usuario) =>
                    <div key={usuario.id}>
                        <p>{usuario.nombre}</p>
                        <input type="text" />
                         <button className="botonEditarUsuario">Editar</button>
                        <p>{usuario.correo}</p>
                        <p>{usuario.contraseña}</p>
                    </div>
                )}
                </section>
            </main>
        </div>
    )
}

export default MostrarUsuario
