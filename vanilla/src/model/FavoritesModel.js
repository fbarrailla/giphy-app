import { EventEmitter } from 'events';

export default class FavoritesModel extends EventEmitter {
  favorites = [];

  setFavorites(favorites) {
    this.favorites = favorites;
  }

  getFavorites() {
    return this.favorites;
  }

  addFavorite(gif) {
    this.favorites.push(gif);
    this.emit('added');
  }

  removeFavorite(id) {
    const favorite = this.favorites.find(fav => fav.id === id);
    this.favorites.splice(this.favorites.indexOf(favorite), 1);
    this.emit('removed');
  }
}
