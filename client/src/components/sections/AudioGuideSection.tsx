import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { GirivalamCheckpoint } from "@shared/schema";

export default function AudioGuideSection() {
  const [language, setLanguage] = useState<'tamil' | 'english'>('english');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([80]);

  const { data: checkpoints, isLoading } = useQuery<GirivalamCheckpoint[]>({
    queryKey: ['/api/girivalam/checkpoints'],
  });

  const handlePlayPause = (audioUrl?: string) => {
    if (isPlaying) {
      setIsPlaying(false);
      // In a real app, pause the audio
    } else {
      if (audioUrl) {
        setCurrentAudio(audioUrl);
      }
      setIsPlaying(true);
      // In a real app, play the audio
    }
  };

  const audioTopics = [
    { id: 'history', title: 'Temple History', duration: '5:20' },
    { id: 'legends', title: 'Legends', duration: '3:45' },
    { id: 'mantras', title: 'Mantras', duration: '4:10' },
    { id: 'significance', title: 'Significance', duration: '6:30' }
  ];

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <Card className="bg-gradient-to-r from-deep-red to-saffron text-white overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Spiritual Audio Guide</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLanguage('tamil')}
                className={`text-xs px-2 py-1 rounded-md ${
                  language === 'tamil' 
                    ? 'bg-white bg-opacity-30 text-white' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                }`}
              >
                Tamil
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLanguage('english')}
                className={`text-xs px-2 py-1 rounded-md ${
                  language === 'english' 
                    ? 'bg-white bg-opacity-30 text-white' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                }`}
              >
                English
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Current Playing */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {currentAudio ? 'Arunachaleswarar Temple' : 'Select Audio Guide'}
              </span>
              <span className="text-xs opacity-80">3:45</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                onClick={() => handlePlayPause()}
                className="w-8 h-8 bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-40 rounded-full flex items-center justify-center p-0"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </Button>
              <div className="flex-1">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-sm opacity-80 hover:opacity-100 p-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </Button>
            </div>
            <div className="mt-2">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-1/3"
              />
            </div>
          </div>

          {/* Audio Topics */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {audioTopics.map((topic) => (
              <Button
                key={topic.id}
                onClick={() => handlePlayPause(`/audio/${topic.id}_${language}.mp3`)}
                variant="ghost"
                className="bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 p-2 rounded-md text-xs h-auto flex flex-col items-center"
              >
                <span className="font-medium">{topic.title}</span>
                <span className="opacity-80 text-xs">{topic.duration}</span>
              </Button>
            ))}
          </div>

          {/* Checkpoint Audio Guides */}
          {checkpoints && checkpoints.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 opacity-90">Checkpoint Guides</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {checkpoints.slice(0, 3).map((checkpoint) => (
                  <div 
                    key={checkpoint.id}
                    className="flex items-center justify-between p-2 bg-white bg-opacity-10 rounded-md"
                  >
                    <div>
                      <p className="text-xs font-medium">
                        {language === 'tamil' ? checkpoint.tamilName : checkpoint.name}
                      </p>
                      <p className="text-xs opacity-80">{checkpoint.distanceFromStart} KM</p>
                    </div>
                    {(checkpoint.audioGuideUrl || checkpoint.audioGuideTamilUrl) && (
                      <Button
                        size="sm"
                        onClick={() => handlePlayPause(
                          language === 'tamil' 
                            ? checkpoint.audioGuideTamilUrl || checkpoint.audioGuideUrl
                            : checkpoint.audioGuideUrl || checkpoint.audioGuideTamilUrl
                        )}
                        className="w-6 h-6 bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 rounded-full flex items-center justify-center p-0"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audio Guide Features */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card className="border-saffron border-2">
          <CardContent className="p-4 text-center">
            <svg className="w-8 h-8 text-saffron mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h4 className="font-semibold text-sm mb-1">Temple Stories</h4>
            <p className="text-xs text-gray-600">Ancient legends and mythology</p>
          </CardContent>
        </Card>
        
        <Card className="border-gold border-2">
          <CardContent className="p-4 text-center">
            <svg className="w-8 h-8 text-gold mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <h4 className="font-semibold text-sm mb-1">Sacred Chants</h4>
            <p className="text-xs text-gray-600">Mantras and devotional songs</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
