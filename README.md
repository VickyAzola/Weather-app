# Weather App

Aplicación web responsive para consultar el clima actual y el pronóstico por hora y por día de distintas ubicaciones.

[Ver demo en vivo](https://weather-app-tailwindreact.netlify.app/)

![Vista previa de Weather App con el clima actual y el pronóstico semanal](https://github.com/user-attachments/assets/00d6c12a-4ecd-40b5-bd27-15c3a34e81cb)

## Características

- Consulta del clima actual, pronóstico por hora y pronóstico diario.
- Búsqueda de ubicaciones con la API de geocodificación de Open-Meteo.
- Cambio entre unidades métricas e imperiales.
- Estados de carga, resultados vacíos y errores de conexión.
- Diseño responsive para móvil y escritorio.

## Tecnologías

- **React** para la interfaz y el manejo de estado.
- **TypeScript** para el tipado y la mantenibilidad.
- **Tailwind CSS** para los estilos.
- **Vite** como entorno de desarrollo y herramienta de compilación.
- **Open-Meteo SDK** para consumir el pronóstico meteorológico.

## APIs

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api): búsqueda de ciudades y coordenadas.
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs): datos actuales y pronósticos meteorológicos.

## Arquitectura

La aplicación separa la obtención, transformación y presentación de los datos:

- `src/services/`: consulta las APIs y devuelve datos meteorológicos sin transformar.
- `src/composables/`: convierte los datos en un modelo preparado para la interfaz.
- `src/helpers/`: centraliza el formato de fechas, horas e iconos meteorológicos.
- `src/components/` y `src/views/`: renderizan los datos ya formateados.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone git@github.com:VickyAzola/Weather-app.git
   ```

2. Entra al directorio del proyecto:

   ```bash
   cd Weather-app
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la URL `Local` que Vite muestra en la terminal.

## Créditos

- Diseño basado en el desafío [Weather App de Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).
- Datos meteorológicos proporcionados por [Open-Meteo](https://open-meteo.com/).

## Autora

[Victoria Azola Silva](https://github.com/VickyAzola)
