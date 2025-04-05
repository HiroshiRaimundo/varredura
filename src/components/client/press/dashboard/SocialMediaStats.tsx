
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SocialMediaCard, { SocialMediaStat } from './SocialMediaCard';
import RecentMentions from './RecentMentions';

interface SocialMediaStatsProps {
  socialMediaStats: SocialMediaStat[];
}

const SocialMediaStats: React.FC<SocialMediaStatsProps> = ({ socialMediaStats }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {socialMediaStats.map((platform) => (
          <SocialMediaCard key={platform.platform} platform={platform} />
        ))}
      </div>

      <RecentMentions />
    </>
  );
};

export default SocialMediaStats;
