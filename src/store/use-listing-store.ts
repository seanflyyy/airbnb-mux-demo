import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Video {
  assetId: string;
  playbackId: string;
  status: string;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  dates: string;
  videos?: Video[];
}

interface ListingStore {
  selectedListing: Property | null;
  setSelectedListing: (listing: Property | null) => void;
  updateListingVideos: (listingId: string, videos: Video[]) => void;
}

export const useListingStore = create<ListingStore>(
  persist(
    (set) => ({
      selectedListing: null,
      setSelectedListing: (listing) => set({ selectedListing: listing }),
      updateListingVideos: (listingId, videos) =>
        set((state) => ({
          selectedListing: state.selectedListing?.id === listingId
            ? { ...state.selectedListing, videos }
            : state.selectedListing
        })),
    }),
    {
      name: 'listing-storage',
    }
  )
);