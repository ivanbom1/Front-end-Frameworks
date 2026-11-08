import { createContext, useContext, useReducer, useEffect } from "react";
import type { Theme, Movie } from "../types";

type State = {
  theme: Theme;
  favorites: Movie[];
  ratings: Record<number, number>;
};

type Action =
  | { type: "SET_THEME" }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_RATING"; payload: { id: number; stars: number}};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      }
    };
    case "SET_RATING":
        return {
            ...state,
            ratings: { ...state.ratings, [action.payload.id]: action.payload.stars },
        };
    default:
      return state;
  }
};

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  ratings: Record<number, number>;
  setRating: (id: number, stars: number) => void;
  getRating: (id: number) => number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const initialTheme = (localStorage.getItem("cinegrid_theme") as Theme) || "dark";


  const initialFavorites: Movie[] = JSON.parse(
    localStorage.getItem("cinegrid_favorites") || "[]",
  );

  const initialRatings: Record<number, number> = JSON.parse(
  localStorage.getItem("cinegrid_ratings") || "{}",
  );

    const [state, dispatch] = useReducer(reducer, {
    theme: initialTheme,
    favorites: initialFavorites,
    ratings: initialRatings,
    });

  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("cinegrid_favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem("cinegrid_ratings", JSON.stringify(state.ratings));
  }, [state.ratings]);

  const toggleTheme = () => dispatch({ type: "SET_THEME" });

  const toggleFavorite = (movie: Movie) =>
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });

  const isFavorite = (id: number) => state.favorites.some((m) => m.id === id);

  const setRating = (id: number, stars: number) =>
    dispatch({ type: "SET_RATING", payload: { id, stars } });

  const getRating = (id: number) => state.ratings[id] ?? 0;

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
        ratings: state.ratings,
        setRating,
        getRating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};