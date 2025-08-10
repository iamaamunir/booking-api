export interface IGetPropertiesDTO {
  id: string;
  title: string;
  description?: string;
  price_per_night: number;
  available_from: string;
  available_to: string;
}