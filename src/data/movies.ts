import quantumStrikeImage from "@/assets/movie-quantum-strike.jpg";
import midnightParisImage from "@/assets/movie-midnight-paris.jpg";
import lastColonyImage from "@/assets/movie-last-colony.jpg";

export interface CastMember {
  id: string;
  name: string;
  character: string;
  image?: string;
  role: 'actor' | 'director' | 'producer' | 'writer' | 'cinematographer' | 'composer';
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  imdbRating: number;
  year: number;
  runtime: string;
  genre: string[];
  director: string;
  cast: string[];
  castAndCrew: CastMember[];
  description: string;
  trailerUrl?: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
}

export const movies: Movie[] = [
  {
    id: "quantum-strike",
    title: "Quantum Strike",
    poster: quantumStrikeImage,
    rating: 4.5,
    imdbRating: 8.7,
    year: 2024,
    runtime: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Michael Chen",
    cast: ["Chris Reynolds", "Sarah Mitchell", "David Kim", "Elena Rodriguez"],
    castAndCrew: [
      { id: "1", name: "Chris Reynolds", character: "Marcus Kane", role: "actor" },
      { id: "2", name: "Sarah Mitchell", character: "Dr. Elena Vasquez", role: "actor" },
      { id: "3", name: "David Kim", character: "Agent Park", role: "actor" },
      { id: "4", name: "Elena Rodriguez", character: "Commander Torres", role: "actor" },
      { id: "5", name: "Michael Chen", character: "Director", role: "director" },
      { id: "6", name: "Robert Stone", character: "Producer", role: "producer" },
      { id: "7", name: "Lisa Wang", character: "Cinematographer", role: "cinematographer" },
      { id: "8", name: "James Miller", character: "Composer", role: "composer" },
      { id: "9", name: "Anna Thompson", character: "Dr. Sarah Chen", role: "actor" },
      { id: "10", name: "Mark Johnson", character: "General Harrison", role: "actor" },
    ],
    description: "In a world where quantum technology has revolutionized warfare, an elite soldier must navigate through parallel dimensions to prevent a catastrophic timeline collapse that threatens all of humanity.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reviews: [
      {
        id: "1",
        author: "MovieCritic2024",
        rating: 5,
        content: "Absolutely mind-blowing action sequences with incredible visual effects. The quantum dimension concept is executed flawlessly.",
        date: "2024-01-15",
        helpful: 142
      },
      {
        id: "2",
        author: "SciFiFan88",
        rating: 4,
        content: "Great action movie with solid performances. The plot gets a bit complex in the middle but overall very entertaining.",
        date: "2024-01-12",
        helpful: 89
      }
    ]
  },
  {
    id: "midnight-paris",
    title: "Midnight in Paris",
    poster: midnightParisImage,
    rating: 4.2,
    imdbRating: 7.9,
    year: 2024,
    runtime: "1h 52m",
    genre: ["Romance", "Drama", "Comedy"],
    director: "Sophie Laurent",
    cast: ["James Morrison", "Claire Dubois", "Antoine Bernard", "Isabella Santos"],
    castAndCrew: [
      { id: "11", name: "James Morrison", character: "Gil Pender", role: "actor" },
      { id: "12", name: "Claire Dubois", character: "Adriana", role: "actor" },
      { id: "13", name: "Antoine Bernard", character: "Paul Bates", role: "actor" },
      { id: "14", name: "Isabella Santos", character: "Inez", role: "actor" },
      { id: "15", name: "Sophie Laurent", character: "Director", role: "director" },
      { id: "16", name: "Pierre Moreau", character: "Producer", role: "producer" },
      { id: "17", name: "Jean-Luc Godard", character: "Cinematographer", role: "cinematographer" },
      { id: "18", name: "Stéphane Wrembel", character: "Composer", role: "composer" },
      { id: "19", name: "Marion Cotillard", character: "Gabrielle", role: "actor" },
      { id: "20", name: "Owen Wilson", character: "Ernest Hemingway", role: "actor" },
    ],
    description: "A charming romantic comedy about an American writer who discovers that midnight walks through Paris transport him back to the 1920s, where he meets his literary heroes and finds unexpected love.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reviews: [
      {
        id: "3",
        author: "RomanceReviewer",
        rating: 5,
        content: "A delightful journey through time and love. The cinematography of Paris is absolutely stunning.",
        date: "2024-01-10",
        helpful: 76
      },
      {
        id: "4",
        author: "FilmBuff2024",
        rating: 4,
        content: "Charming and witty with great performances. A perfect date night movie.",
        date: "2024-01-08",
        helpful: 54
      }
    ]
  },
  {
    id: "last-colony",
    title: "The Last Colony",
    poster: lastColonyImage,
    rating: 4.7,
    imdbRating: 9.1,
    year: 2024,
    runtime: "2h 45m",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    director: "Robert Harrison",
    cast: ["Mark Thompson", "Lisa Chen", "Alexander Petrov", "Maria Gonzalez"],
    castAndCrew: [
      { id: "21", name: "Mark Thompson", character: "Captain John Perry", role: "actor" },
      { id: "22", name: "Lisa Chen", character: "Dr. Jane Sagan", role: "actor" },
      { id: "23", name: "Alexander Petrov", character: "Colonel Savitsky", role: "actor" },
      { id: "24", name: "Maria Gonzalez", character: "Commander Zoe Boutin", role: "actor" },
      { id: "25", name: "Robert Harrison", character: "Director", role: "director" },
      { id: "26", name: "Christopher Nolan", character: "Producer", role: "producer" },
      { id: "27", name: "Roger Deakins", character: "Cinematographer", role: "cinematographer" },
      { id: "28", name: "Hans Zimmer", character: "Composer", role: "composer" },
      { id: "29", name: "Emily Blunt", character: "General Rybicki", role: "actor" },
      { id: "30", name: "John Krasinski", character: "Lieutenant Su", role: "actor" },
    ],
    description: "Humanity's final hope rests on a distant planet as Earth faces extinction. Follow the colonists as they struggle to build a new civilization while facing unknown alien threats and their own human nature.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    reviews: [
      {
        id: "5",
        author: "SpaceMovieFan",
        rating: 5,
        content: "Epic space drama with incredible world-building. This is what science fiction cinema should be.",
        date: "2024-01-05",
        helpful: 198
      },
      {
        id: "6",
        author: "CinemaExpert",
        rating: 5,
        content: "Masterpiece of storytelling and visual effects. A must-watch for any serious movie lover.",
        date: "2024-01-03",
        helpful: 167
      }
    ]
  }
];

export const featuredMovie = movies[0];