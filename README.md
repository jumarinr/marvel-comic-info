# Proyecto para consumir el API expuesta por Marvel

## Documentación del API usada
[https://developer.marvel.com/docs](https://developer.marvel.com/docs)

## Pagina en producción
[https://marvel-comic-info.netlify.app/](https://marvel-comic-info.netlify.app/)

## Guía para ejecución local
1. Obtener una key de marvel. Esta la puedes obtener en el siguiente enlace: [https://developer.marvel.com/account]()
2. Inicializar la variable de entorno `REACT_APP_URL_API` con el valor de `https://gateway.marvel.com:443/v1/public`
3. Inicializar la variable de entorno `REACT_APP_API_KEY` con la public key de marvel
4. Ejecutar `npm start`

## Funcionalidades de la aplicación
- Permitir mostrar los comics de marvel en forma paginada y filtrarlos por personajes, formato, tipo de formato. Adicionalmente posee la opción de ordenar por nombre y fecha de venta
- Permitir mostrar los personajes de marvel en forma paginada y filtrarlos por comics en los que aparecen. Adicionalmente posee la opción de ordenar por nombre y modificación de este

## Decisiones técnicas
- Se utiliza useContext para el manejo de estados entre varios niveles anidados de componentes (nietos llamado funciones del abuelo). Este se ve reflejado al momento de buscar comics o personajes.
- Se divide la aplicación en componentes, intentando que un componente tenga una funcionalidad especifica para poder reutilizarla después de ser el caso. Esto se ve reflejado en los filtros de búsqueda
- Se utilizan media queries para desplegar resultados acorde a la resolución del usuario
- Se utiliza material ui como libreria de desarrollo dada su facilidad de implementación
- Se utiliza axios para los llamados http dada su facilidad de enviar parametros y buena documentación de uso
- Se installa e implementa eslint para mantener el código limpio y evitar errores no vistos por el codificador
- Se instala lodash para acceder a sus funcionalidades sobre arreglos y objetos
- Se utiliza localstorage para ayudar al usuario a abrir la ayuda por primera vez