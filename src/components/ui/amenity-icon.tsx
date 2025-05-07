import { Wifi, Waves, Dumbbell, Heart, UtensilsCrossed, Car, Coffee, Umbrella } from 'lucide-react';

type AmenityIconProps = {
  id: string;
  className?: string;
};

export function AmenityIcon({ id, className = "w-5 h-5" }: AmenityIconProps) {
  switch (id) {
    case 'wifi':
      return <Wifi className={className} />;
    case 'pool':
      return <Waves className={className} />;
    case 'gym':
      return <Dumbbell className={className} />;
    case 'spa':
      return <Heart className={className} />; // Changed from Spa to Heart icon
    case 'restaurant':
      return <UtensilsCrossed className={className} />;
    case 'parking':
      return <Car className={className} />;
    case 'breakfast':
      return <Coffee className={className} />;
    case 'beach':
      return <Umbrella className={className} />;
    default:
      return null;
  }
}