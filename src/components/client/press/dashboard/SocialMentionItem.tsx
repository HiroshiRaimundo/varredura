
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

interface SocialMentionItemProps {
  platform: 'twitter' | 'instagram' | 'facebook';
  username: string;
  content: string;
  time: string;
  likes: number;
  shares?: number;
  comments?: number;
}

const SocialMentionItem: React.FC<SocialMentionItemProps> = ({
  platform,
  username,
  content,
  time,
  likes,
  shares,
  comments
}) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-sky-500" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {getPlatformIcon()}
      </div>
      <div>
        <p className="font-medium">{username}</p>
        <p className="text-sm text-muted-foreground">{content}</p>
        <div className="flex items-center mt-1 text-xs text-muted-foreground gap-4">
          <span>{time}</span>
          <span>{likes} likes</span>
          {shares && <span>{shares} {platform === 'twitter' ? 'retweets' : 'shares'}</span>}
          {comments && <span>{comments} {platform === 'instagram' ? 'comentários' : 'comentários'}</span>}
        </div>
      </div>
    </div>
  );
};

export default SocialMentionItem;
