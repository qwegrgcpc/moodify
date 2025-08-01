interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  animationDelay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  children, 
  animationDelay 
}) => {
  return (
    <div 
      className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 flex flex-col animate-fade-in transition-all duration-300 hover:-translate-y-1" 
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-gray-400 my-6 flex-grow">{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard;
