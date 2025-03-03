'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useListingStore } from '@/store/use-listing-store';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  dates: string;
  videos?: { assetId: string; playbackId: string; status: string }[];
}

export const PropertyCard = (props: PropertyCardProps) => {
  const router = useRouter();
  const { setSelectedListing } = useListingStore();

  const handleClick = () => {
    setSelectedListing(props);
    router.push(`/listing/${props.id}`);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <button
            className="absolute right-3 top-3 rounded-full bg-white p-1.5 text-gray-900 transition-transform hover:scale-110"
            aria-label="Add to favorites"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-1.5 p-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">{props.title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="ml-1 text-sm">{props.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{props.location}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{props.dates}</p>
        <p className="text-lg font-semibold">
          ${props.price} <span className="text-sm font-normal">night</span>
        </p>
      </CardFooter>
    </Card>
  );
};