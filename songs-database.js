// Base de datos de canciones de rock nacional argentino
const SONGS_DATABASE = {
    rock: [
        // Soda Stereo
        {
            title: "De Música Ligera",
            artist: "Soda Stereo",
            album: "Canción Animal",
            year: 1990,
            searchTerms: ["De Música Ligera Soda Stereo", "Soda Stereo De Musica Ligera"]
        },
        {
            title: "Persiana Americana",
            artist: "Soda Stereo",
            album: "Signos",
            year: 1986,
            searchTerms: ["Persiana Americana Soda Stereo", "Soda Stereo Persiana Americana"]
        },
        {
            title: "En la Ciudad de la Furia",
            artist: "Soda Stereo",
            album: "Ruido Blanco",
            year: 1987,
            searchTerms: ["En la Ciudad de la Furia Soda Stereo", "Ciudad de la Furia Soda Stereo"]
        },
        {
            title: "Cuando Pase el Temblor",
            artist: "Soda Stereo",
            album: "Nada Personal",
            year: 1985,
            searchTerms: ["Cuando Pase el Temblor Soda Stereo", "Soda Stereo Cuando Pase Temblor"]
        },
        {
            title: "Prófugos",
            artist: "Soda Stereo",
            album: "Soda Stereo",
            year: 1984,
            searchTerms: ["Prófugos Soda Stereo", "Soda Stereo Profugos"]
        },

        // Charly García
        {
            title: "Nos Siguen Pegando Abajo",
            artist: "Charly García",
            album: "Clics Modernos",
            year: 1983,
            searchTerms: ["Nos Siguen Pegando Abajo Charly García", "Charly Garcia Nos Siguen Pegando"]
        },
        {
            title: "Los Dinosaurios",
            artist: "Charly García",
            album: "Clics Modernos",
            year: 1983,
            searchTerms: ["Los Dinosaurios Charly García", "Charly Garcia Los Dinosaurios"]
        },
        {
            title: "Demoliendo Hoteles",
            artist: "Charly García",
            album: "Piano Bar",
            year: 1984,
            searchTerms: ["Demoliendo Hoteles Charly García", "Charly Garcia Demoliendo Hoteles"]
        },
        {
            title: "Rezo Por Vos",
            artist: "Charly García",
            album: "Filosofía Barata y Zapatos de Goma",
            year: 1990,
            searchTerms: ["Rezo Por Vos Charly García", "Charly Garcia Rezo Por Vos"]
        },

        // Los Fabulosos Cadillacs
        {
            title: "Matador",
            artist: "Los Fabulosos Cadillacs",
            album: "El León",
            year: 1992,
            searchTerms: ["Matador Los Fabulosos Cadillacs", "Fabulosos Cadillacs Matador"]
        },
        {
            title: "Vasos Vacíos",
            artist: "Los Fabulosos Cadillacs",
            album: "Vasos Vacíos",
            year: 1993,
            searchTerms: ["Vasos Vacíos Los Fabulosos Cadillacs", "Fabulosos Cadillacs Vasos Vacios"]
        },
        {
            title: "El Satanico Dr. Cadillac",
            artist: "Los Fabulosos Cadillacs",
            album: "Bares y Fondas",
            year: 1986,
            searchTerms: ["El Satanico Dr Cadillac Los Fabulosos Cadillacs", "Satanico Dr Cadillac"]
        },

        // Los Redonditos de Ricota
        {
            title: "Jijiji",
            artist: "Los Redonditos de Ricota",
            album: "Oktubre",
            year: 1986,
            searchTerms: ["Jijiji Los Redonditos de Ricota", "Redonditos Jijiji"]
        },
        {
            title: "Un Ángel Para Tu Soledad",
            artist: "Los Redonditos de Ricota",
            album: "Un Baión Para el Ojo Idiota",
            year: 1988,
            searchTerms: ["Un Angel Para Tu Soledad Redonditos", "Redonditos Angel Soledad"]
        },

        // Virus
        {
            title: "Wadu Wadu",
            artist: "Virus",
            album: "Wadu Wadu",
            year: 1981,
            searchTerms: ["Wadu Wadu Virus", "Virus Wadu Wadu"]
        },
        {
            title: "Luna de Miel en la Mano",
            artist: "Virus",
            album: "Agujero Interior",
            year: 1983,
            searchTerms: ["Luna de Miel en la Mano Virus", "Virus Luna Miel Mano"]
        },

        // Divididos
        {
            title: "Spaghetti del Rock",
            artist: "Divididos",
            album: "40 Dibujos Ahí en el Piso",
            year: 1993,
            searchTerms: ["Spaghetti del Rock Divididos", "Divididos Spaghetti Rock"]
        },
        {
            title: "Que Ves?",
            artist: "Divididos",
            album: "La Era de la Boludez",
            year: 1993,
            searchTerms: ["Que Ves Divididos", "Divididos Que Ves"]
        },

        // Sumo
        {
            title: "La Rubia Tarada",
            artist: "Sumo",
            album: "Llegando los Monos",
            year: 1986,
            searchTerms: ["La Rubia Tarada Sumo", "Sumo La Rubia Tarada"]
        },
        {
            title: "Kaya",
            artist: "Sumo",
            album: "Llegando los Monos",
            year: 1986,
            searchTerms: ["Kaya Sumo", "Sumo Kaya"]
        },

        // Patricio Rey y sus Redonditos de Ricota
        {
            title: "Motor Psico",
            artist: "Patricio Rey y sus Redonditos de Ricota",
            album: "Gulp!",
            year: 1985,
            searchTerms: ["Motor Psico Patricio Rey Redonditos", "Motor Psico Redonditos"]
        },

        // Andrés Calamaro
        {
            title: "Flaca",
            artist: "Andrés Calamaro",
            album: "Alta Suciedad",
            year: 1997,
            searchTerms: ["Flaca Andrés Calamaro", "Andres Calamaro Flaca"]
        },
        {
            title: "Loco",
            artist: "Andrés Calamaro",
            album: "Alta Suciedad",
            year: 1997,
            searchTerms: ["Loco Andrés Calamaro", "Andres Calamaro Loco"]
        },

        // Rata Blanca
        {
            title: "Mujer Amante",
            artist: "Rata Blanca",
            album: "Magos, Espadas y Rosas",
            year: 1990,
            searchTerms: ["Mujer Amante Rata Blanca", "Rata Blanca Mujer Amante"]
        },
        {
            title: "La Leyenda del Hada y el Mago",
            artist: "Rata Blanca",
            album: "Magos, Espadas y Rosas",
            year: 1990,
            searchTerms: ["La Leyenda del Hada y el Mago Rata Blanca", "Rata Blanca Hada Mago"]
        },

        // Attaque 77
        {
            title: "Hacelo Por Mí",
            artist: "Attaque 77",
            album: "Ángeles Caídos",
            year: 1989,
            searchTerms: ["Hacelo Por Mí Attaque 77", "Attaque 77 Hacelo Por Mi"]
        },

        // Los Piojos
        {
            title: "Muy Despacito",
            artist: "Los Piojos",
            album: "Ay Ay Ay",
            year: 1994,
            searchTerms: ["Muy Despacito Los Piojos", "Los Piojos Muy Despacito"]
        },
        {
            title: "Verano del 92",
            artist: "Los Piojos",
            album: "Tercer Arco",
            year: 1996,
            searchTerms: ["Verano del 92 Los Piojos", "Los Piojos Verano 92"]
        }
    ],

    pop: [
        // Canciones más pop/mainstream del rock argentino
        {
            title: "De Música Ligera",
            artist: "Soda Stereo",
            album: "Canción Animal",
            year: 1990,
            searchTerms: ["De Música Ligera Soda Stereo", "Soda Stereo De Musica Ligera"]
        },
        {
            title: "Flaca",
            artist: "Andrés Calamaro",
            album: "Alta Suciedad",
            year: 1997,
            searchTerms: ["Flaca Andrés Calamaro", "Andres Calamaro Flaca"]
        },
        {
            title: "Matador",
            artist: "Los Fabulosos Cadillacs",
            album: "El León",
            year: 1992,
            searchTerms: ["Matador Los Fabulosos Cadillacs", "Fabulosos Cadillacs Matador"]
        }
    ]
};

// Función para obtener todas las canciones
function getAllSongs() {
    const allSongs = [];
    Object.values(SONGS_DATABASE).forEach(genre => {
        allSongs.push(...genre);
    });
    // Eliminar duplicados basándose en título y artista
    const uniqueSongs = allSongs.filter((song, index, self) => 
        index === self.findIndex(s => s.title === song.title && s.artist === song.artist)
    );
    return uniqueSongs;
}

// Función para obtener canciones por género
function getSongsByGenre(genre) {
    if (genre === 'all') {
        return getAllSongs();
    }
    return SONGS_DATABASE[genre] || [];
}

// Función para obtener una canción aleatoria
function getRandomSong(genre = 'all') {
    const songs = getSongsByGenre(genre);
    if (songs.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
}

// Función para generar opciones incorrectas
function generateWrongOptions(correctSong, genre = 'all', count = 5) {
    const allSongs = getSongsByGenre(genre);
    const wrongOptions = allSongs
        .filter(song => song.title !== correctSong.title || song.artist !== correctSong.artist)
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    
    return wrongOptions;
}
