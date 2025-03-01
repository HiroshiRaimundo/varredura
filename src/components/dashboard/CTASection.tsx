
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Monitor, Shield, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTACardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const CTACard: React.FC<CTACardProps> = ({ icon, title, description, iconColor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
};

const ctaFeatures = [
  {
    icon: <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />,
    title: "Fácil integração",
    description: "APIs e ferramentas para integração com seus sistemas existentes.",
    iconColor: "text-blue-600"
  },
  {
    icon: <Monitor className="h-6 w-6 text-green-600 mr-2" />,
    title: "Multiplataforma",
    description: "Acesse seus dados de qualquer dispositivo, em qualquer lugar.",
    iconColor: "text-green-600"
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-600 mr-2" />,
    title: "Segurança",
    description: "Dados protegidos com os mais altos padrões de segurança.",
    iconColor: "text-purple-600"
  },
  {
    icon: <Smile className="h-6 w-6 text-amber-600 mr-2" />,
    title: "Experiência",
    description: "Interface intuitiva e amigável para facilitar sua experiência.",
    iconColor: "text-amber-600"
  }
];

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-50 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-gray-600 mb-6">
                Solicite uma demonstração personalizada para conhecer como nossas soluções podem
                atender às suas necessidades específicas.
              </p>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                onClick={() => navigate('/payment')}
              >
                Solicitar demonstração
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ctaFeatures.map((feature, index) => (
                <CTACard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
