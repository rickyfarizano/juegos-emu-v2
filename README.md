<h1>Juegos Emu</h1>

<h2>Integrantes</h2>
<ul>
  <li><strong>Ricardo Farizano.</strong></li>
  <li><strong>Tomas Averbuj.</strong></li>
  <li><strong>Matias Quinteros</strong>.</li>
</ul>

<h2>¿De que se trata el proyecto?</h2>
Juegos Emu es un sitio web para amantes del Gaming y los videojuegos, que buscan disfrutar de un inmenso catalogo de juego y experimentar con titulos nuevos sin gastar ni un solo centavo.

<h3>¿A quien va dirigido?</h3>
A cualquier persona que busque disfrutar de los videojuegos e introducirse en el mundo del Gaming.

<h2>¿Como correr el proyecto?</h2>
<ul>
  <li>Paso1: Una vez que se ingresa al repositorio, el primer paso es clonar el proyecto en tu editor de codigo de preferencia con el comando <strong>git clone y la url del proyecto</strong>.</li>
  <li>
    Paso2: Una vez clonado el repositorio, y estando en tu editor de codigo, poner el comando <strong>cd backend</strong>, acto seguido ingresar el comando <strong>npm i</strong> para descargar las dependencias del proyecto en el backend y, como punto final,
    introducir el comando  <strong>npm start</strong> para iniciar el servidor Backend del proyecto. (Luego, poner el comando cd .. para retroceder a la carpeta principal del proyecto)
  </li>
  <li>
    Paso3: Repetir el paso 2 pero en vez de usar la carpeta Backend, usar la carpeta Frontend. Una vez que hayas descargado las dependencias necesarias, el comando que debes introducir para correr el Frontend es: <strong>npm run dev</strong>,
  </li>
</ul>

<h2>Frontend</h2>
<h3>Vistas</h3>
A continuacion se detallaran las vitas principales del sitio web y como acceder a ellas.
<ul>
  <li>Home: Pagina principal del sitio web, en ella vas a encontrar Un banner de presentacion de algunos de nuestros titulos, junto con Carousels de juegos de las distintas categorias que nuestra pagina ofrece. (Podes acceder a ella desde el menu de navegacion 
  o escribiendo "/" en la url).</li>
  <li>Juegos: Contiene una lista de todos los juegos presentes en la pagina. (Podes acceder a ella desde el menu de navegacion 
  o escribiendo "/gameList" en la url)</li>
  <li>Desarrolladores: Contiene una lista de todos los desarrolladores presentes en la pagina. (Podes acceder a ella desde el menu de navegacion 
  o escribiendo "/developers" en la url)</li>
  <li>Categorias: Contiene un menu desplegable con todas las categorias de nuestros juegos. Si cliqueas alguna, va a mostrarte todos los juegos pertenecientes a esa categoria. (Podes acceder a ella desde el menu de navegacion 
  o escribiendo "/category/nameCategory" en la url)</li>
  <li>Iniciar sesion: Permite que inicies sesion en nuestro sitio web con tu email y contraseña. (Podes acceder a ella desde el menu de navegacion o escribiendo "/login" en la url) </li>
  <li>Registrarse:Permite que te registres en nuestro sitio web, usando tu nombre de usuario, correo y contraseña. (Podes acceder a ella desde el menu de navegacion o escribiendo "/register" en la url) </li>
  <li>Menu de administracion del sitio web:Permite gestionar y realizar todas y cada una de las operaciones CRUD de los juegos, desarrolladores y usuarios agregados a la pagina. (Podes acceder a ella debes ingresar "/admin" en la url, si queres accedes a los developers,
    entonces agrega "/admin/developers" a la url, y si queres aceder a los usuarios, entonces agrega "/admin/users" a la url) </li>
  <li>Buscaor: permite buscar entre los distintos juegos presentes en la pagina. (Podes acceder a el desde el menu de navegacion o, ingresar "/search?search=gameName" en la url para que busque un juego)</li>
</ul>
Tambien tenemos las vistas:<br>
GameDetails: muestra los detalles del juego cliqueado<br>
DeveloperDetails: muestra los detalles y juegos de la desarrolladora cliqueada

<h2>Backend</h2>
A continuacion se detallaran las rutas de la api en el Backend y como interactuar con ellas desde Postman:
Si por casualidad no tenes postman instalado, a continuacion te dejo el link para que lo descargues: <a href="https://www.postman.com/downloads/" target="_blank">Descargar Postman</a>.
<h3>Juegos</h3>
<ul>
  <li>/api/games/: permite realizar operaciones GET y POST para obtener y agregar nuevos juegos</li>
  <li>/api/users/game/category/:genre : permite obtener una lista de juegos filtrados en base a su genero</li>
  <li>/api/users/game/:id : permite eliminar un juego en concreto por medio de DELETE en base a su id</li>
  <li>/api/users/game/:id : permite actualizar los datos de un usuario en concreto por medio de UPDATE</li>
</ul>

<h3>Desarrolladores</h3>
<ul>
  <li>/api/developers: permite realizar operaciones GET y POST para obtener y agregar nuevos desarrolladores</li>
  <li>/api/developers/:name : permite obtener un desarrollador en especifico en base a su id o nombre usando GET</li>
  <li>/api/developers/:name  : permite actualizar un desarrollador en concreto por medio de PUT en base a su id o nombre</li>
  <li>/api/developers/:name  : permite eliminar a un desarrollador en concreto por medio de DELETE</li>
</ul>

<h3>Categorias</h3>
<ul>
  <li>/api/categories : permite realizar operaciones GET y POST para obtener y agregar nuevas categorias</li>
</ul>

<h3>Usuarios</h3>
<ul>
  <li>/api/users/: permite realizar operaciones GET y POST para obtener y agregar nuevos usuarios</li>
  <li>/api/users/name/:userName : permite obtener a un usuario en concreto por medio de GET</li>
  <li>/api/users/name/:userNameToDelete : permite eliminar a un usuario en concreto por medio de DELETE</li>
  <li>/api/users/name/:userNameToUpdate : permite actualizar los datos de un usuario en concreto por medio de UPDATE</li>
</ul>

<h2>Ramas</h2>
<ul>
  <li><strong>Rama Backend</strong>: cambios del Backend. (main del backend)</li>
  <li><strong>Rama Frontend</strong>cambios del Frontend. (main del frontend)</li>
</ul>

La idea es mantener los cambios de Frontend y Backend separados en todo momento, para mantener el repositorio ordenado y evitar conflictos.
La rama <strong>main</strong> solamente va a utilizarse para hacer el merge final del frontend y el backend para luego entregar el proyecto o, en todo caso, hacer deploy 
en algun hosting si asi lo queremos.
<br>
En caso de querer hacer cambios sobre el Frontend o sobre el Backend, las ramas van a crearse a partir de estas mismas respectivcamente. Es decir, si queres hacer un <strong>cambio
en el frontend</strong>, vas a <strong>acceder primero a la rama de frontend</strong> y vas a <strong>crear una nueva rama estando posicionado en la rama frontend</strong>. Lo mismo aplica para el backend

<h3>¿Como vamos a nombrar las ramas?</h3>
La idea es que podamos identificar rapidamente de que se trata la rama que creamos para poder mantener el orden y, al mismo timepo, identificar en donde es el cambio. Por este motivo, vamos a clasificar los cambios en los siguientes tipos para asignarlos como parte
del nombre de una rama y poder ubicarlos:
<br><br>
<ul>
  <li><strong>feat</strong>: cambio o funcionalidad nueva.</li>
  <li><strong>refact</strong>: refactorizaciones de codigo. (ocurre cuando, por ejemplo, optimizas codigo pero el funcionamiento sigue siendo el mismo)</li>
  <li><strong>fix</strong>: cambio grande a solucionar.</li>
  <li><strong>hotfix</strong>: cambio chico a solucionar.</li>
</ul>

Sabiendo esto, la idea es nombrar las ramas de la siguiente forma:

<strong>feat/frontend-header</strong>
<br>
<strong>fix/backend-userController</strong>

<h3>¿Como vamos a crear las ramas?</h3>
<ol>
  <li>Creamos un Issue con el nombre de la rama</li>
  <li>En git, cambiamos a la rama Frontend o Backend y agregamos el comando <strong>git checkout -b nombre-rama</strong> </li>
  <li>Despues, agregamos el comando <strong>git push -u origin nombre-rama</strong></li>
</ol>
Vamos a usar los Issue para llevar un seguimiento claro de los errores en caso de ser necesario.

<h3>¿Como vamos a hacer commits?</h3>
de la misma manera en la que documentamos las ramas. Con este formato.
<ul>
  <li><strong>feat/frontend-header</strong></li>
  <li><strong>fix/backend-userController</strong></li>
</ul>
