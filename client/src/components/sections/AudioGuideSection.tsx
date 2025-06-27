import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlayIcon, 
  PauseIcon, 
  VolumeIcon, 
  LanguagesIcon,
  BookOpenIcon,
  StarIcon,
  ClockIcon,
  DownloadIcon,
  HeadphonesIcon
} from "lucide-react";
import type { GirivalamCheckpoint } from "@shared/schema";

interface AudioContent {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  duration: string;
  category: 'temple' | 'legend' | 'mantra' | 'story' | 'prayer';
  audioUrl: string;
  audioUrlTamil: string;
  transcript?: string;
  isPopular?: boolean;
}

export default function AudioGuideSection() {
  const [language, setLanguage] = useState<'tamil' | 'english'>('english');
  const [currentAudio, setCurrentAudio] = useState<AudioContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([80]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: checkpoints, isLoading } = useQuery<GirivalamCheckpoint[]>({
    queryKey: ['/api/girivalam/checkpoints'],
  });

  // Comprehensive audio content for Girivalam journey
  const audioContent: AudioContent[] = [
    // Temple Stories
    {
      id: 'arunachala-glory',
      title: 'The Glory of Arunachala Hill',
      titleTamil: 'அருணாசல மலையின் பெருமை',
      description: 'The sacred story of how Lord Shiva manifested as a column of fire',
      duration: '8:45',
      category: 'temple',
      audioUrl: '/audio/arunachala-glory-en.mp3',
      audioUrlTamil: '/audio/arunachala-glory-ta.mp3',
      isPopular: true
    },
    {
      id: 'girivalam-significance',
      title: 'Significance of Girivalam',
      titleTamil: 'கிரிவலத்தின் சிறப்பு',
      description: 'Why circumambulating Arunachala brings spiritual benefits',
      duration: '6:30',
      category: 'temple',
      audioUrl: '/audio/girivalam-significance-en.mp3',
      audioUrlTamil: '/audio/girivalam-significance-ta.mp3',
      isPopular: true
    },
    {
      id: 'eight-lingams',
      title: 'The Eight Directional Lingams',
      titleTamil: 'எட்டு திசை லிங்கங்கள்',
      description: 'Stories of the eight Shiva lingams around Arunachala',
      duration: '12:20',
      category: 'temple',
      audioUrl: '/audio/eight-lingams-en.mp3',
      audioUrlTamil: '/audio/eight-lingams-ta.mp3'
    },

    // Legends and Stories
    {
      id: 'parvati-tapas',
      title: 'Parvati\'s Penance',
      titleTamil: 'பார்வதியின் தவம்',
      description: 'The story of Goddess Parvati\'s penance at Arunachala',
      duration: '7:15',
      category: 'legend',
      audioUrl: '/audio/parvati-tapas-en.mp3',
      audioUrlTamil: '/audio/parvati-tapas-ta.mp3'
    },
    {
      id: 'brahma-vishnu-search',
      title: 'Brahma and Vishnu\'s Search',
      titleTamil: 'பிரம்மா விஷ்ணுவின் தேடல்',
      description: 'How Brahma and Vishnu searched for the ends of the fire pillar',
      duration: '9:10',
      category: 'legend',
      audioUrl: '/audio/brahma-vishnu-search-en.mp3',
      audioUrlTamil: '/audio/brahma-vishnu-search-ta.mp3',
      isPopular: true
    },
    {
      id: 'ramana-teachings',
      title: 'Ramana Maharshi\'s Teachings',
      titleTamil: 'ரமண மகரிஷியின் உபதேசம்',
      description: 'Spiritual teachings of the great sage Ramana Maharshi',
      duration: '11:45',
      category: 'story',
      audioUrl: '/audio/ramana-teachings-en.mp3',
      audioUrlTamil: '/audio/ramana-teachings-ta.mp3',
      isPopular: true
    },

    // Mantras and Prayers
    {
      id: 'arunachala-stuti',
      title: 'Arunachala Stuti',
      titleTamil: 'அருணாசல ஸ்துதி',
      description: 'Sacred hymns in praise of Lord Arunachala',
      duration: '5:20',
      category: 'mantra',
      audioUrl: '/audio/arunachala-stuti-en.mp3',
      audioUrlTamil: '/audio/arunachala-stuti-ta.mp3'
    },
    {
      id: 'girivalam-mantras',
      title: 'Girivalam Walking Mantras',
      titleTamil: 'கிரிவலம் மந்திரங்கள்',
      description: 'Sacred mantras to chant while walking the path',
      duration: '8:00',
      category: 'mantra',
      audioUrl: '/audio/girivalam-mantras-en.mp3',
      audioUrlTamil: '/audio/girivalam-mantras-ta.mp3'
    },
    {
      id: 'shiva-panchakshara',
      title: 'Om Namah Shivaya',
      titleTamil: 'ஓம் நமஃ சிவாய',
      description: 'The powerful five-syllable mantra of Lord Shiva',
      duration: '4:30',
      category: 'prayer',
      audioUrl: '/audio/shiva-panchakshara-en.mp3',
      audioUrlTamil: '/audio/shiva-panchakshara-ta.mp3'
    },

    // Checkpoint-specific content
    {
      id: 'indra-lingam-story',
      title: 'Indra Lingam Stories',
      titleTamil: 'இந்திர லிங்க கதைகள்',
      description: 'Tales associated with the eastern temple',
      duration: '6:45',
      category: 'temple',
      audioUrl: '/audio/indra-lingam-en.mp3',
      audioUrlTamil: '/audio/indra-lingam-ta.mp3'
    },
    {
      id: 'meditation-guide',
      title: 'Walking Meditation Guide',
      titleTamil: 'நடை தியானம்',
      description: 'How to practice mindful walking during Girivalam',
      duration: '10:30',
      category: 'story',
      audioUrl: '/audio/walking-meditation-en.mp3',
      audioUrlTamil: '/audio/walking-meditation-ta.mp3'
    }
  ];

  const handlePlayPause = (audio?: AudioContent) => {
    if (audio && audio !== currentAudio) {
      setCurrentAudio(audio);
      setIsPlaying(true);
      // Simulate audio playback
      setProgress(0);
      setDuration(parseInt(audio.duration.split(':')[0]) * 60 + parseInt(audio.duration.split(':')[1]));
      
      // Mock progress update
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'temple': return '🛕';
      case 'legend': return '📚';
      case 'mantra': return '🕉️';
      case 'story': return '📖';
      case 'prayer': return '🙏';
      default: return '🎵';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'temple': return 'bg-orange-500';
      case 'legend': return 'bg-purple-500';
      case 'mantra': return 'bg-blue-500';
      case 'story': return 'bg-green-500';
      case 'prayer': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredContent = audioContent.filter(content => {
    return true; // Show all content for now
  });

  const popularContent = audioContent.filter(content => content.isPopular);

  if (isLoading) {
    return (
      <section className="px-4 pb-20">
        <div className="animate-pulse space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-20">
      <Card className="overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5" />
                Spiritual Audio Guide
              </CardTitle>
              <p className="text-sm opacity-90">Sacred stories, mantras, and teachings for your journey</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
              className="bg-white bg-opacity-20 border-white text-white hover:bg-opacity-30"
            >
              <LanguagesIcon className="w-4 h-4 mr-2" />
              {language === 'english' ? 'தமிழ்' : 'English'}
            </Button>
          </div>
        </CardHeader>

        {/* Audio Player */}
        {currentAudio && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b">
            <div className="mb-3">
              <h4 className="font-medium text-gray-900">
                {language === 'english' ? currentAudio.title : currentAudio.titleTamil}
              </h4>
              <p className="text-sm text-gray-600">{currentAudio.description}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatTime(Math.floor(progress * duration / 100))}</span>
                <span>{currentAudio.duration}</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handlePlayPause(currentAudio)}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-10 h-10 p-0"
                >
                  {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </Button>
                
                <div className="flex items-center gap-2">
                  <VolumeIcon className="w-4 h-4 text-gray-600" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>

              <Badge className={`text-white ${getCategoryColor(currentAudio.category)}`}>
                {getCategoryIcon(currentAudio.category)} {currentAudio.category}
              </Badge>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <CardContent className="p-4">
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <StarIcon className="w-4 h-4" /> Popular
              </TabsTrigger>
              <TabsTrigger value="temples" className="flex items-center gap-1">
                🛕 Temples
              </TabsTrigger>
              <TabsTrigger value="mantras" className="flex items-center gap-1">
                🕉️ Mantras
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-1">
                📚 Stories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="mt-4">
              <div className="space-y-3">
                {popularContent.map((audio) => (
                  <Card key={audio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Button
                            onClick={() => handlePlayPause(audio)}
                            variant="outline"
                            size="sm"
                            className="rounded-full w-10 h-10 p-0"
                          >
                            {isPlaying && currentAudio?.id === audio.id ? 
                              <PauseIcon className="w-4 h-4" /> : 
                              <PlayIcon className="w-4 h-4" />
                            }
                          </Button>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {language === 'english' ? audio.title : audio.titleTamil}
                            </h4>
                            <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryIcon(audio.category)} {audio.category}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <ClockIcon className="w-3 h-3" />
                                {audio.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="temples" className="mt-4">
              <div className="space-y-3">
                {filteredContent
                  .filter(audio => audio.category === 'temple')
                  .map((audio) => (
                    <Card key={audio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Button
                              onClick={() => handlePlayPause(audio)}
                              variant="outline"
                              size="sm"
                              className="rounded-full w-10 h-10 p-0"
                            >
                              {isPlaying && currentAudio?.id === audio.id ? 
                                <PauseIcon className="w-4 h-4" /> : 
                                <PlayIcon className="w-4 h-4" />
                              }
                            </Button>
                            
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {language === 'english' ? audio.title : audio.titleTamil}
                              </h4>
                              <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <ClockIcon className="w-3 h-3" />
                                {audio.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="mantras" className="mt-4">
              <div className="space-y-3">
                {filteredContent
                  .filter(audio => audio.category === 'mantra' || audio.category === 'prayer')
                  .map((audio) => (
                    <Card key={audio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Button
                              onClick={() => handlePlayPause(audio)}
                              variant="outline"
                              size="sm"
                              className="rounded-full w-10 h-10 p-0"
                            >
                              {isPlaying && currentAudio?.id === audio.id ? 
                                <PauseIcon className="w-4 h-4" /> : 
                                <PlayIcon className="w-4 h-4" />
                              }
                            </Button>
                            
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {language === 'english' ? audio.title : audio.titleTamil}
                              </h4>
                              <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {getCategoryIcon(audio.category)} {audio.category}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  {audio.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="mt-4">
              <div className="space-y-3">
                {filteredContent
                  .filter(audio => audio.category === 'legend' || audio.category === 'story')
                  .map((audio) => (
                    <Card key={audio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Button
                              onClick={() => handlePlayPause(audio)}
                              variant="outline"
                              size="sm"
                              className="rounded-full w-10 h-10 p-0"
                            >
                              {isPlaying && currentAudio?.id === audio.id ? 
                                <PauseIcon className="w-4 h-4" /> : 
                                <PlayIcon className="w-4 h-4" />
                              }
                            </Button>
                            
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {language === 'english' ? audio.title : audio.titleTamil}
                              </h4>
                              <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {getCategoryIcon(audio.category)} {audio.category}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  {audio.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Quick Access */}
        <div className="bg-gray-50 p-4 border-t">
          <h4 className="font-medium mb-3 text-sm">Quick Access</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start">
              🕉️ Daily Mantras
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              📿 Meditation Timer
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              🎵 Bhajans & Kirtans
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              📖 Sacred Texts
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}