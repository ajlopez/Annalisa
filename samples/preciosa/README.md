# Usando Annalisa para Preciosa

Este es un ejemplo de uso de datos del proyecto [Preciosa](https://github.com/mgaitan/preciosa)
 usando el módulo Annalisa.

 
## Servidor

Es el principal caso de uso. Necesitan instalar [Node](http://nodejs.org/) pero si lo pude
instalar yo, lo puede instalar cualquiera. Y funciona en varias plataformas, con baja fricción.

Para instalar lo necesario para el servidor, desde este directorio hacer

```
cd server
npm install
```

El manejador de paquetes `npm` (Node Package Manager) ya quedó instalado con Node. En el directorio
`server` hay un archivo `package.json` que define las dependencias que necesita. Usé Express como
principal dependencia. Podría usar algo más pequeño y simple, pero para este caso de uso está bien.

Luego, estando en ese directorio, se puede lanzar el servidor con
```
node app
```

Luego de un mensaje de carga de datos, aparecerá otro texto que indica que el servidor comenzó
a escuchar por `http://localhost:3000`. Pueden abrir el navegador con esa dirección pero sólo
verán una página de inicio.

Hay dos puntos de entrada que devuelven JSON:

http://localhost:3000/api/analyze?q=pomelo%20fanta%201lt

analiza el texto `pomelo fanta 1 lt` y devuelve las característica que el sistema encuentra
y deduce de ese texto. Por ejemplo

```json
{
  "tamanio": 1,
  "unidad": "litro",
  "sabor": "Pomelo",
  "marca": "Fanta",
  "marcaid": 5,
  "fabricanteid": 1,
  "fabricante": "Coca-Cola de Argentina",
  "categoria": "Pomelo",
  "categoriaid": 385
}
```

Y el otro punto de entrada busca en productos, marcas, fabricantes y categorias:

http://localhost:3000/api/search?q=fanta%20pomelo

Posible resultado

```json
[
  {
    "value": "Gaseosa de pomelo fanta 1,5 lt",
    "data": {
      "tamanio": 5,
      "unidad": "litro",
      "sabor": "Pomelo",
      "marca": "Fanta",
      "marcaid": 5,
      "fabricanteid": 1,
      "fabricante": "Coca-Cola de Argentina",
      "categoria": "Pomelo",
      "categoriaid": 385,
      "id": 351,
      "upc": "0779089500054",
      "notas": "PrecioGranel: $8.66"
    }
  },
  {
    "value": "Gaseosa de pomelo fanta 1,5 lt",
    "data": {
      "tamanio": 5,
      "unidad": "litro",
      "sabor": "Pomelo",
      "marca": "Fanta",
      "marcaid": 5,
      "fabricanteid": 1,
      "fabricante": "Coca-Cola de Argentina",
      "categoria": "Pomelo",
      "categoriaid": 385,
      "id": 351,
      "upc": "0779089500054",
      "notas": "PrecioGranel: $8.66"
    }
  },
  {
    "value": "Gaseosa de pomelo fanta 2,25 lt",
    "data": {
      "tamanio": 25,
      "unidad": "litro",
      
   ...
   ...
```

Noten que todavía se confunde con la coma decimal, y reconoce 25 litros, en vez de 2,25 litros.


