import React from 'react'
import { useState } from 'react' /* obligatorio para usar Hook del tipo useState */
import ServicesUsuario from '../services/ServicesUsuario.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function FormularioRegistro() { /* entre aqui y return es el js */
    const [nombreUsuario, setNombreUsuario] = useState("")
    /* useState el valor por defecto, pero con el const, se setea el valor */
    const [correoUsuario, setCorreoUsuario] = useState("") /* Es uno por cada input */

    const [contraseñaUsuario, setContraseñaUsuario] = useState("") /* camelCase en el set */

    const [confirmarContraseñaUsuario, setConfirmarContraseñaUsuario] = useState("")

    const navigate = useNavigate()

    async function registroUsuario() { /* función del boton */
        if (!contraseñaUsuario || !correoUsuario || !nombreUsuario || !confirmarContraseñaUsuario) {
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });


        } else {
            const datosUsuario = await ServicesUsuario.getUsuario()
            const correoExiste = datosUsuario.find(usuario => usuario.correo === correoUsuario)
            if (correoExiste) {
                Swal.fire({
                    title: '¡error!',
                    text: 'Este correo ya está registrado',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                if (contraseñaUsuario.length < 6) { /* no ocupa el .value, el como esta diseñado ya lo toma como tal, por la parte html que colocamos que value= a estos y ahora ya se toma como valor siempre */
                    Swal.fire({
                        title: "Error",
                        text: "La contraseña debe tener al menos 6 caracteres",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    if (confirmarContraseñaUsuario === contraseñaUsuario) {
                        const objRegistro = {
                            nombre: nombreUsuario,
                            correo: correoUsuario,
                            contraseña: contraseñaUsuario,

                        }
                        const productosAlmacenados = await ServicesUsuario.postUsuario(objRegistro)
                        if (productosAlmacenados) {
                            Swal.fire({
                                title: '¡Éxito!',
                                text: 'La operación se realizó correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then(() => {
                                navigate('/')
                            })
                        }
                    } else {
                        Swal.fire({
                            title: '¡error!',
                            text: 'La contraseña no coincide',
                            icon: 'warning',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
            }


            /*  console.log(nombreUsuario, correoUsuario, contraseñaUsuario); } */





            setNombreUsuario("");
            setCorreoUsuario("");
            setContraseñaUsuario("");
            setConfirmarContraseñaUsuario("")


        }
    }
    return ( /* todo dentro de aqui es html */
        <div className="registro-container">

            <main className="registro-main">
                <section className="registro-section">
                    <h2>Formulario de registro</h2>
                    <label htmlFor="nombreUsuario">Usuario</label>
                    <input type="text" name="nombreUsuario" id="nombreUsuario" value={nombreUsuario} onChange={(evento) => setNombreUsuario(evento.target.value)} />
                    <label htmlFor="correoUsuario">Correo</label>
                    <input type="email" name="correoUsuario" id="correoUsuario" value={correoUsuario} onChange={(evento) => setCorreoUsuario(evento.target.value)} /> {/* value es una variable */}
                    <label htmlFor="contraseñaUsuario">Contraseña</label>
                    <input type="password" name="contraseñaUsuario" id="contraseñaUsuario" value={contraseñaUsuario} onChange={(evento) => setContraseñaUsuario(evento.target.value)} />
                    <label htmlFor="confirmarContraseñaUsuario">Confirmar contraseña</label>
                    <input type="password" name="confirmarContraseñaUsuario" id="confirmarContraseñaUsuario" value={confirmarContraseñaUsuario} onChange={(evento) => setConfirmarContraseñaUsuario(evento.target.value)} />
                    <div className="registro-boton-container">
                        <button onClick={registroUsuario}>Guardar</button>
                    </div>
                </section>
            </main>


        </div >
    )
}

export default FormularioRegistro
