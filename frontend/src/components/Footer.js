import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
   <footer>
        <div className="contaienr">
            <div className="alumnos">
                <div className="alumno">
                    <p className="nombre-alumno">Ricardo Farizano</p>
                </div>
                <div className="alumno">
                    <p className="nombre-alumno">Tomas Averbuj</p>
                </div>
                <div className="alumno">
                    <p className="nombre-alumno">Matias Quinteros</p>
                </div>
            </div>
            <div className="datos-cursada">
                <p><u>Nombre de la materia</u>: Aplicaciones Hibridas</p>
                <p><u>Nombre del docente</u>: MARCOS GALBÁN, Camila Belén</p>
                <p><u>Comisión</u>: dwn4av</p>
            </div>
        </div>
   </footer>
  )
}

export default Footer