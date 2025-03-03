'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ImagePlus, BedDouble, Bath, Video, ChevronDown, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import MuxPlayer from '@mux/mux-player-react';
import { useVideo } from '@/contexts/VideoContext';

interface Room {
  id: string;
  type: string;
  photos: string[];
}

export const ListingEditor = () => {
  const [rooms] = useState<Room[]>([
    { id: 'bedroom', type: 'Bedroom', photos: [] },
    { id: 'bathroom', type: 'Full bathroom', photos: [] }
  ]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { playbackId, setPlaybackId } = useVideo();

  const handlePhotoUpload = (roomId: string) => {
    console.log('Uploading photo for room:', roomId);
  };

  const handleVideoUpload = async (roomId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(roomId);
      setProgress(0);

      try {
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Upload URL creation failed:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          throw new Error('Failed to get upload URL');
        }

        const responseData = await response.json();
        console.log('Upload endpoint response:', responseData);

        const { data } = responseData;
        const { url, id: uploadId } = data;

        if (!url || !uploadId) {
          console.error('Invalid response data:', responseData);
          throw new Error('Invalid response from upload endpoint');
        }

        const upload = await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          }
        });

        if (!upload.ok) {
          console.error('File upload failed:', {
            status: upload.status,
            statusText: upload.statusText
          });
          throw new Error('Failed to upload file');
        }

        let finalPlaybackId;
        while (!finalPlaybackId) {
          const checkResponse = await fetch(`/api/videos?uploadId=${uploadId}`);
          const data = await checkResponse.json();
          console.log('Upload status check:', data);
          
          if (data.data.status === 'asset_created') {
            const assetId = data.data.asset_id;
            const assetResponse = await fetch(`/api/videos?assetId=${assetId}`);
            const assetData = await assetResponse.json();
            console.log('Asset data:', assetData);
            
            if (assetData.data.status === 'ready' && assetData.data.playback_ids?.[0]) {
              finalPlaybackId = assetData.data.playback_ids[0].id;
              setPlaybackId(finalPlaybackId);
              toast({
                title: 'Upload complete',
                description: 'Your video has been uploaded successfully.'
              });
              break;
            }
          } else if (data.data.status === 'errored') {
            console.error('Upload processing failed:', data);
            throw new Error('Upload processing failed');
          }

          await new Promise(resolve => setTimeout(resolve, 1000));
          setProgress(prev => Math.min(prev + 10, 90));
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: 'Upload failed',
          description: error instanceof Error ? error.message : 'An error occurred',
          variant: 'destructive'
        });
      } finally {
        setUploading(null);
        setProgress(0);
      }
    };
    input.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="mr-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <h1 className="text-2xl font-semibold">Listing editor</h1>
      </div>

      <Tabs defaultValue="space" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="space">Your space</TabsTrigger>
          <TabsTrigger value="guide">Arrival guide</TabsTrigger>
        </TabsList>

        <TabsContent value="space" className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Photo tour</h2>
              <Button variant="outline" size="sm">
                All photos
              </Button>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Manage photos and add details. Guests will only see your tour if every room has a photo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {room.id === 'bedroom' ? (
                        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-700">
                          <BedDouble className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Bedroom preview</p>
                        </div>
                      ) : (
                        <>
                          {uploading === room.id ? (
                            <div className="flex flex-col items-center gap-4 p-4">
                              <Loader2 className="h-6 w-6 animate-spin" />
                              <span>Uploading...</span>
                              <Progress value={progress} className="w-full" />
                            </div>
                          ) : !playbackId ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <ImagePlus className="h-8 w-8" />
                                    <ChevronDown className="h-4 w-4" />
                                  </div>
                                  Add media
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handlePhotoUpload(room.id)}>
                                  <ImagePlus className="h-4 w-4 mr-2" />
                                  Add photos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleVideoUpload(room.id)}>
                                  <Video className="h-4 w-4 mr-2" />
                                  Add video
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <MuxPlayer
                              streamType="on-demand"
                              playbackId={playbackId}
                              metadata={{ 
                                video_title: `${room.type} Tour`,
                                viewer_user_id: "user-id-123"
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {room.id === 'bedroom' ? (
                          <BedDouble className="h-5 w-5" />
                        ) : (
                          <Bath className="h-5 w-5" />
                        )}
                        <h3 className="font-medium">{room.type}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {room.id === 'bedroom' ? 
                          'Preview only' : 
                          (!playbackId ? 'Add photos or video' : '1 video')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Property details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your property title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-1"
                  placeholder="Describe your property"
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="guide">
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Arrival guide content will be available soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};