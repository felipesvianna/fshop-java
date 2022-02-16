export interface AuthenticationProps {
  token?: string;
  isAuthenticated?: boolean;
  userData?: UserProps;
}

export interface LinkButtonProps {
  routeName: string;
  linkName: string;
}

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
  id: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  password?: string;
}
