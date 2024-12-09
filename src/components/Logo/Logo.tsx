interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`inline-block ${className || ''}`}>
      <h1>SamikBeach</h1>
    </div>






  );
}
