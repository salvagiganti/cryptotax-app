import Image from 'next/image';

interface CryptoLogoProps {
  symbol: string;
  name: string;
  size?: number;
}

export default function CryptoLogo({ symbol, name, size = 48 }: CryptoLogoProps) {
  // Using cryptocurrency-icons CDN
  const logoUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${symbol.toLowerCase()}.svg`;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={logoUrl}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full"
        unoptimized // Important for external SVGs
      />
    </div>
  );
}
