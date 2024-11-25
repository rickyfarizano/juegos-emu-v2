import React from 'react'

const GameDetails = () => {
  return (
    <section className="game-details">
      <div className="container">

        <div className="game-detals__content">

          <div className="game-details__title-img">
            {/* TITULO DINAMICO */}
            <h1 className="game-details__title">Titulo del juego</h1>

            <figure className="game-details__img-banner">
              <img src="#" alt="Imagen dle juego" />
            </figure>
          </div>

          <article className="game-details__description">
            <h2 className="title">Descripicon del juego</h2>

            {/* INFO DINAMICA */}
            <p className="details-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, facilis! Deleniti neque sed eligendi dolor 
              ratione dignissimos officia voluptatum repellat culpa odio explicabo necessitatibus, quo, dolorem nostrum?
               Repellendus, nostrum atque!
            </p>
          </article>

          <article className="game-details__screenshots">
            <h2 className="title">Screenshots</h2>
            <div className="screenshots-container">
              {/* carga dinamica de imagenes */}
              <figure className="screehshot">
                <img src="#" alt="Screenshot 1" />
              </figure>
            </div>
          </article>

          <article className="game-requirements">
            <h2 className="title">Requerimientos del sistema</h2>
            <div className="list-container">
              {/* carga dinamica de requerimientos */}
              <ul className="req-list">
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
                <li>item 5</li>
              </ul>
            </div>
          </article>

          {/* Agregar link de descarga dinamicamente */}
          <a href="#" className="btn-download">Descargar juego</a>
        </div>

      </div>
    </section>
  )
}

export default GameDetails