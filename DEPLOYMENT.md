# 🚀 Cómo Poner Songless en Línea

## Opciones de Hosting Gratuito

### 1. **Netlify** (Recomendado - Más Fácil)

**Pasos:**
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta gratuita
2. Arrastra toda la carpeta del proyecto a la zona de "Deploy"
3. ¡Listo! Tu sitio estará en línea en segundos

**Ventajas:**
- Completamente gratuito
- HTTPS automático
- Dominio personalizado gratis (.netlify.app)
- Actualizaciones automáticas si conectas con GitHub

---

### 2. **Vercel** (Muy Popular)

**Pasos:**
1. Ve a [vercel.com](https://vercel.com) y regístrate
2. Conecta tu cuenta de GitHub (opcional)
3. Sube tu proyecto o conecta el repositorio
4. Deploy automático

**Ventajas:**
- Gratis para proyectos personales
- Muy rápido
- Integración perfecta con GitHub

---

### 3. **GitHub Pages** (Si usas GitHub)

**Pasos:**
1. Sube tu código a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main como source
4. Tu sitio estará en `https://tuusuario.github.io/nombre-repo`

**Ventajas:**
- Totalmente gratis
- Integrado con GitHub
- Fácil de mantener

---

### 4. **Firebase Hosting** (Google)

**Pasos:**
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting`
4. `firebase deploy`

**Ventajas:**
- Infraestructura de Google
- Muy rápido globalmente
- Gratis hasta cierto límite

---

## 🔧 Preparación Antes del Deploy

### Archivos Necesarios:
Asegúrate de tener todos estos archivos en tu carpeta:
```
songless/
├── index.html
├── styles.css
├── app.js
├── game.js
├── config.js (con tu API Key)
├── songs-database.js
├── youtube-api.js
└── README.md
```

### ⚠️ Importante - Seguridad de API Key:

**Problema:** Tu API Key está visible en `config.js`, lo que no es seguro en producción.

**Soluciones:**

#### Opción A: Variables de Entorno (Netlify/Vercel)
1. En Netlify/Vercel, ve a Settings → Environment Variables
2. Agrega: `YOUTUBE_API_KEY = tu_api_key_aqui`
3. Modifica `config.js`:
```javascript
const CONFIG = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 'TU_API_KEY_AQUI',
    // ... resto de config
};
```

#### Opción B: Restricciones de API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a Credenciales → Tu API Key → Restricciones
3. Agrega tu dominio (ej: `tuapp.netlify.app`)

---

## 🚀 Guía Paso a Paso - Netlify (Recomendado)

### Método 1: Drag & Drop (Más Fácil)
1. **Prepara tu carpeta:** Asegúrate de tener todos los archivos
2. **Ve a Netlify:** [netlify.com](https://netlify.com)
3. **Crea cuenta:** Usa email o GitHub
4. **Deploy:** Arrastra tu carpeta a la zona "Want to deploy a new site without connecting to Git?"
5. **¡Listo!** Tu sitio estará en `https://random-name.netlify.app`

### Método 2: Con GitHub (Actualizaciones Automáticas)
1. **Sube a GitHub:** Crea un repositorio y sube tu código
2. **Conecta Netlify:** "New site from Git" → GitHub → Selecciona repo
3. **Deploy:** Netlify detectará automáticamente que es un sitio estático
4. **Actualizaciones:** Cada vez que hagas push a GitHub, se actualiza automáticamente

---

## 🌐 Dominio Personalizado (Opcional)

### Dominio Gratis:
- Netlify: `tuapp.netlify.app`
- Vercel: `tuapp.vercel.app`
- GitHub: `tuusuario.github.io/tuapp`

### Dominio Propio:
1. Compra un dominio (ej: en Namecheap, GoDaddy)
2. En Netlify/Vercel: Settings → Domain → Add custom domain
3. Configura los DNS según las instrucciones

---

## 📱 Optimizaciones para Producción

### 1. Comprimir Archivos
```bash
# Opcional: Minificar CSS y JS para mejor rendimiento
npm install -g uglify-js clean-css-cli
uglifyjs app.js game.js -o app.min.js
cleancss styles.css -o styles.min.css
```

### 2. Agregar Meta Tags (SEO)
En `index.html`, agrega en el `<head>`:
```html
<meta name="description" content="Songless - Adivina canciones de rock nacional argentino">
<meta property="og:title" content="Songless - Rock Nacional Argentino">
<meta property="og:description" content="Juego de adivinanza musical con clásicos del rock argentino">
<meta property="og:image" content="https://tudominio.com/preview.png">
```

### 3. Favicon
Agrega un favicon.ico en la carpeta raíz.

---

## 🔍 Verificación Post-Deploy

Después del deploy, verifica:
- ✅ La página carga correctamente
- ✅ La API Key funciona (no hay errores de YouTube)
- ✅ El audio se reproduce
- ✅ Las opciones de respuesta aparecen
- ✅ El juego funciona en móviles

---

## 💡 Recomendación Final

**Para empezar rápido:** Usa Netlify con drag & drop
**Para proyecto serio:** Usa Netlify/Vercel con GitHub para actualizaciones automáticas

¿Necesitas ayuda con algún paso específico?
