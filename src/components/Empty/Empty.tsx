interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export default function Empty({ icon, title, description }: Props) {
  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4">
      {icon && <div className="text-gray-400">{icon}</div>}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
