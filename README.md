# 🎵 Songless - Rock Nacional Argentino

Un juego de adivinanza musical inspirado en Songless, enfocado en el rock nacional argentino y las canciones más populares de Argentina.

## 🚀 Características

- **Interfaz idéntica** al Songless original
- **Base de datos curada** con clásicos del rock nacional argentino
- **6 etapas de dificultad** con fragmentos de audio progresivos
- **Integración con YouTube** para audio real de las canciones
- **Diseño responsive** que funciona en móviles y desktop
- **Modo oscuro** moderno y elegante

## 🎸 Artistas Incluidos

- **Soda Stereo** - De Música Ligera, Persiana Americana, En la Ciudad de la Furia
- **Charly García** - Los Dinosaurios, Nos Siguen Pegando Abajo, Demoliendo Hoteles
- **Los Fabulosos Cadillacs** - Matador, Vasos Vacíos, El Satánico Dr. Cadillac
- **Los Redonditos de Ricota** - Jijiji, Un Ángel Para Tu Soledad
- **Andrés Calamaro** - Flaca, Loco
- **Rata Blanca** - Mujer Amante, La Leyenda del Hada y el Mago
- **Divididos** - Spaghetti del Rock, Que Ves?
- **Los Piojos** - Muy Despacito, Verano del 92
- **Sumo** - La Rubia Tarada, Kaya
- **Virus** - Wadu Wadu, Luna de Miel en la Mano
- **Attaque 77** - Hacelo Por Mí
- Y muchos más...

## ⚙️ Configuración

### 1. Obtener YouTube API Key

Para que el juego funcione, necesitas una API Key gratuita de YouTube:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **YouTube Data API v3**
4. Ve a **Credenciales** → **Crear credenciales** → **Clave de API**
5. Copia tu API Key

### 2. Configurar la API Key

1. Abre el archivo `config.js`
2. Reemplaza `'TU_API_KEY_AQUI'` con tu API Key real:

```javascript
const CONFIG = {
    YOUTUBE_API_KEY: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Tu API Key aquí
    // ... resto de la configuración
};
```

3. Guarda el archivo

### 3. Ejecutar el Juego

Simplemente abre `index.html` en tu navegador web o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

## 🎮 Cómo Jugar

1. **Selecciona un género** (Todos, Rock, Pop)
2. **Presiona COMENZAR** para iniciar
3. **Escucha el fragmento** de audio (comienza con 0.1 segundos)
4. **Selecciona la canción** correcta de las opciones
5. **Si fallas**, el fragmento se hace más largo en la siguiente etapa
6. **Tienes 6 intentos** para adivinar correctamente

### Etapas de Dificultad

- **Etapa 1**: 0.1 segundos
- **Etapa 2**: 0.2 segundos  
- **Etapa 3**: 0.4 segundos
- **Etapa 4**: 0.8 segundos
- **Etapa 5**: 1.6 segundos
- **Etapa 6**: 3.2 segundos

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS y Flexbox
- **JavaScript ES6+** - Lógica del juego y manejo de APIs
- **YouTube Data API v3** - Búsqueda y reproducción de videos
- **YouTube IFrame API** - Control del reproductor embebido

## 📱 Características Técnicas

### Responsive Design
- Diseño adaptativo para móviles, tablets y desktop
- Menú lateral deslizable en móviles
- Controles táctiles optimizados

### Accesibilidad
- Navegación por teclado (Espacio para play/pause, Escape para volver)
- Etiquetas ARIA apropiadas
- Alto contraste en modo oscuro

### Optimizaciones
- Carga lazy de videos de YouTube
- Manejo de errores robusto
- Caché de búsquedas para mejor rendimiento
- Transiciones suaves y animaciones

## 🔧 Personalización

### Agregar Más Canciones

Edita `songs-database.js` para agregar nuevas canciones:

```javascript
{
    title: "Nombre de la Canción",
    artist: "Nombre del Artista",
    album: "Nombre del Álbum",
    year: 1990,
    searchTerms: [
        "Término de búsqueda 1",
        "Término de búsqueda 2"
    ]
}
```

### Modificar Configuración del Juego

En `config.js` puedes cambiar:

- Duración de las etapas
- Número máximo de intentos
- URLs de la API
- Otros parámetros del juego

## 🚨 Solución de Problemas

### "API Key no configurada"
- Verifica que hayas reemplazado `'TU_API_KEY_AQUI'` con tu API Key real
- Asegúrate de que la API Key sea válida y tenga permisos para YouTube Data API

### "Cuota de API excedida"
- YouTube API tiene un límite diario gratuito de 10,000 unidades
- Cada búsqueda consume ~100 unidades
- Espera hasta el día siguiente o considera upgradearte

### "No se pudo encontrar el video"
- Algunos videos pueden no estar disponibles en tu región
- El algoritmo intentará con diferentes términos de búsqueda
- Considera agregar más términos de búsqueda en la base de datos

### Audio no se reproduce
- Verifica que tu navegador permita autoplay de audio
- Algunos navegadores requieren interacción del usuario primero
- Revisa la consola del navegador para errores específicos

## 📄 Licencia

Este proyecto es una recreación educativa del juego Songless original. 

**Nota importante**: Este juego utiliza contenido musical a través de YouTube. Asegúrate de cumplir con las políticas de uso de YouTube y los derechos de autor correspondientes.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:

- Agregar más canciones a la base de datos
- Mejorar la interfaz de usuario
- Optimizar el rendimiento
- Reportar bugs o sugerir mejoras

## 📞 Soporte

Si tienes problemas:

1. Revisa la consola del navegador para errores
2. Verifica que tu API Key esté configurada correctamente
3. Asegúrate de tener conexión a internet estable
4. Prueba en un navegador diferente

---

¡Disfruta adivinando los clásicos del rock nacional argentino! 🇦🇷🎸
