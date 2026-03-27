export default interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status?: boolean;
  category: string;
  image: string;
  description: string;
  rate?: number;
  rating: {
    rate: number;
    count: number;
  };
}
