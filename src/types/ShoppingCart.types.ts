export default interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options: {
    size: string;
    color: string;
    customizations: string[];
  };
}