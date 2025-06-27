import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TempleInfo } from "@shared/schema";

export default function LiveTempleInfo() {
  const { data: templeInfo, isLoading } = useQuery<TempleInfo>({
    queryKey: ['/api/temple-info'],
    refetchInterval: 30000, // Refetch every 30 seconds for live data
  });

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <Card className="traditional-border">
          <CardContent className="p-4">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <Card className="traditional-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Live Temple Info
            </CardTitle>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Queue Status</span>
              <span className="text-sm font-medium text-orange-600">
                {templeInfo?.queueStatus || 'Moderate'} 
                {templeInfo?.queueWaitTime && ` (${templeInfo.queueWaitTime} min)`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Puja</span>
              <span className="text-sm font-medium text-blue-600">
                {templeInfo?.nextPuja || 'Deepam - 6:30 PM'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Best Time to Visit</span>
              <span className="text-sm font-medium text-green-600">
                {templeInfo?.bestVisitTime || 'After 7:00 PM'}
              </span>
            </div>
            {templeInfo?.specialNotice && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-yellow-800">{templeInfo.specialNotice}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
