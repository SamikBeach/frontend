interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`inline-block ${className || ''}`}>
      <h1 className="font-bold">고전산책</h1>
    </div>
  );
}
