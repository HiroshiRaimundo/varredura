
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SocialMentionItem from './SocialMentionItem';

const RecentMentions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Menções Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="border-b pb-4">
            <SocialMentionItem
              platform="twitter"
              username="@usuario123"
              content="Acabei de conhecer o novo produto da @suamarca e fiquei impressionado! Recomendo para todos. #inovação"
              time="Há 2 horas"
              likes={15}
              shares={3}
            />
          </li>
          <li className="border-b pb-4">
            <SocialMentionItem
              platform="instagram"
              username="@influencer.digital"
              content="Parceria incrível com @suamarca! Conheçam os novos produtos na minha bio. #publi #parceria"
              time="Há 5 horas"
              likes={342}
              comments={27}
            />
          </li>
          <li>
            <SocialMentionItem
              platform="facebook"
              username="Grupo Tecnologia Hoje"
              content="Alguém já testou os produtos da @suamarca? Vale a pena o investimento? Estou pensando em comprar."
              time="Há 12 horas"
              likes={8}
              comments={14}
            />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentMentions;
