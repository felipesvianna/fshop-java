export interface CategoryProps {
    id: number;
    name: string;
}

export interface ProductProps {
    id: number;
    name?: string;
    category?: string;
    details: string;
    quantity: number;
    price: number;
}

export interface ProductCardProps {
    id?: number;
    name: string;
    price: number;
}

export interface UserProps {
  firstName?: string;
  lastName?: string;
  address?: string;
  username?: string;
  password?: string;
}