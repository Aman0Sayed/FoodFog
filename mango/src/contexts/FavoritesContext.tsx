import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/api/client';

interface Recipe {
  id: number;
  title: string;
  description: string;
  time: string;
  servings: number;
  rating: number;
  image: string;
  tags: string[];
}

interface FavoritesContextType {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from backend on mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) return;
    api.get('/api/favorites', { headers: { 'x-username': username } })
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setFavorites(data);
          localStorage.setItem('favorites', JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === recipe.id)) {
        return prev;
      }
      // Save to backend
      const username = localStorage.getItem('username');
      if (username) {
        api.post('/api/favorites', { username, recipe }).catch(() => {});
      }
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
    // Remove from backend
    const username = localStorage.getItem('username');
    if (username) {
      api.delete('/api/favorites', { data: { username, recipeId } }).catch(() => {});
    }
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
