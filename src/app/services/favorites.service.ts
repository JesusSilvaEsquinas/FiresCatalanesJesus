import { computed, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'favoriteActivityIds';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly cambios = signal<number>(0);

  public readonly favoriteActivityIds = computed(() => {
    this.cambios();
    return this.getFavoriteActivityIds();
  });

  getFavoriteActivityIds(): string[] {
    return [...this.readFromStorage()];
  }

  isFavorite(activityId: string): boolean {
    return this.readFromStorage().has(activityId);
  }

  toggle(activityId: string): void {
    const next = this.readFromStorage();

    if (next.has(activityId)) {
      next.delete(activityId);
    } else {
      next.add(activityId);
    }

    this.writeToStorage(next);
    this.cambios.update((v) => v + 1);
  }

  private readFromStorage(): Set<string> {
    if (typeof localStorage === 'undefined') return new Set();

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return new Set();
      return new Set(parsed.filter((x) => typeof x === 'string'));
    } catch {
      return new Set();
    }
  }

  private writeToStorage(ids: Set<string>): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  }
}
