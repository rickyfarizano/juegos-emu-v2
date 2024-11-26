import React from 'react'
import {useParams} from 'react-router-dom'

const GameDetails = () => {
  const {id} = useParams();

  return (
    <section className="game-details">
      <p>id del juego: {id}</p>

      <div className="container">

          <div className="game-details__title-img">
            {/* TITULO DINAMICO */}
            <h1 className="game-details__title text-3xl font-semibold mb-4 text-center text-white ">Titulo del juego</h1>

            <figure className="game-details__img-banner w-100 p-4">
              <img src="/public/images/dragon-ball-banner.jpg" alt="Imagen dle juego" />
            </figure>
          </div>
        <div className="game-detals__content border m-4">


          <article className="game-details__description p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Descripicon del juego</h2>

            {/* INFO DINAMICA */}
            <p className="details-description text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, facilis! Deleniti neque sed eligendi dolor 
              ratione dignissimos officia voluptatum repellat culpa odio explicabo necessitatibus, quo, dolorem nostrum?
               Repellendus, nostrum atque!
            </p>
          </article>

          <article className="game-details__screenshots p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Screenshots</h2>
            <div className="screenshots-container">
              {/* carga dinamica de imagenes */}
              <figure className="screehshot">
                <img src="#" alt="Screenshot 1" />
              </figure>
            </div>
          </article>

          <article className="game-requirements p-4">
            <h2 className="title text-2xl font-semibold mb-4 text-white">Requerimientos del sistema</h2>
            <div className="list-container">
              {/* carga dinamica de requerimientos */}
              <ul className="req-list">
                <li className="text-white">Procesador: Intel Core i3-9100F</li>
                <li className="text-white">Tarjeta gráfica: NVIDIA GTX 750 Ti</li>
                <li className="text-white">RAM: 4 GB DDR3</li>
                <li className="text-white">Almacenamiento: HDD de 500 GB</li>
                <li className="text-white">Sistema operativo: Windows 10 de 64 bits</li>
              </ul>
            </div>
          </article>

          <div className="btn w-100 flex justify-center items-center p-4">
            {/* Agregar link de descarga dinamicamente */}
            <a href="#" className="btn-download text-center p-3 rounded bg-blue-900 hover:bg-blue-800 text-white transition-all">Descargar juego</a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default GameDetails