"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useListingStore} from "@/store/use-listing-store";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Star, ArrowLeft} from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import {useVideo} from "@/contexts/VideoContext";

export default function ListingPage() {
  const router = useRouter();
  const {selectedListing} = useListingStore();
  const {playbackId} = useVideo();

  useEffect(() => {
    if (!selectedListing) {
      router.push("/");
    }
  }, [selectedListing, router]);

  if (!selectedListing) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="aspect-video relative">
                  <img
                    src={selectedListing.image}
                    alt={selectedListing.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {playbackId && (
                  <div className="aspect-video relative">
                    <MuxPlayer
                      streamType="on-demand"
                      playbackId={playbackId}
                      metadata={{
                        video_title: selectedListing.title,
                        viewer_user_id: "user-id-123",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">
                    {selectedListing.title}
                  </h1>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="ml-1 font-semibold">
                      {selectedListing.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedListing.location}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">
                    ${selectedListing.price}{" "}
                    <span className="text-base font-normal">night</span>
                  </p>
                  <Button className="bg-[#FF5A5F] hover:bg-[#FF5A5F]/90">
                    Book now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
