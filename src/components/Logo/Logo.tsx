interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`inline-block cursor-pointer ${className || ''}`}>
      <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-base font-extrabold text-transparent">
        삼익비치
      </h1>
    </div>
  );
}
