<h1>Juegos Emu</h1>

<h2>Integrantes</h2>
<ul>
  <li><strong>Ricardo Farizano.</strong></li>
  <li><strong>Tomas Averbuj.</strong></li>
  <li><strong>Matias Quinteros</strong>.</li>
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
