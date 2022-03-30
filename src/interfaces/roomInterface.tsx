export interface RoomInterface {
  id: string;
  name: string;
  longDescription: string;
  occupancy: {
    maxAdults: number;
    maxChildren: number;
    maxOverall: number;
  };
}
