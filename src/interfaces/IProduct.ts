export default interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
