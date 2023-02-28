export interface iProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export interface iProductCart {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  counter: number;
}
export interface iProductCartModal {
  name: string;
  img: string;
  produt: iProductCart;
}
export interface iProductAddModal {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  product: iProduct;
}
export interface iContextCart {
  products: iProduct[] | undefined;
  cart: iProduct[];
  setModalCart: React.Dispatch<React.SetStateAction<boolean>>;
  modalCart: boolean;
  addProduct: (product: iProduct) => void;
  cartValue: number;
  totalItens: number;
  removeProductCart: (product: iProductCart) => void;
  removeAllCart: () => void;
  searchValue: string;
  search: iProduct[] | undefined;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  removeUnitProduct: (product: iProductCart) => void;
}
