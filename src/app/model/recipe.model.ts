export interface Recipe {
    date: any;
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    imageUrl: string;
    dateAdded: Date;
    isFavorite: boolean;
  }