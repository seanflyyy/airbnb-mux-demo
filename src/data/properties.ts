export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  dates: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Lake House',
    location: 'Lake Tahoe, California',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    dates: 'Available next week'
  },
  {
    id: '2',
    title: 'Mountain Retreat',
    location: 'Aspen, Colorado',
    price: 275,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c',
    dates: 'Available now'
  },
  {
    id: '3',
    title: 'Beachfront Villa',
    location: 'Malibu, California',
    price: 500,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    dates: 'Next month'
  },
  {
    id: '4',
    title: 'Desert Oasis',
    location: 'Scottsdale, Arizona',
    price: 200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1536315238512-4c8cebdaaf93',
    dates: 'Available now'
  },
  {
    id: '5',
    title: 'Urban Loft',
    location: 'New York City, New York',
    price: 450,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    dates: 'Available next month'
  },
  {
    id: '6',
    title: 'Seaside Cottage',
    location: 'Cape Cod, Massachusetts',
    price: 325,
    rating: 4.75,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    dates: 'Book for summer'
  },
  {
    id: '7',
    title: 'Ski Chalet',
    location: 'Park City, Utah',
    price: 600,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    dates: 'Perfect for winter'
  },
  {
    id: '8',
    title: 'Tropical Paradise',
    location: 'Maui, Hawaii',
    price: 800,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762',
    dates: 'Limited availability'
  }
];