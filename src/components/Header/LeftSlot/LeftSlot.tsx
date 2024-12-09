export default function LeftSlot() {
  const a = 1;

  return (
    <div className="flex items-center">
      <svg
        className="h-8 w-8 text-blue-600"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>

      <span className="ml-2 text-xl font-bold">Logo</span>
    </div>
  );
}
