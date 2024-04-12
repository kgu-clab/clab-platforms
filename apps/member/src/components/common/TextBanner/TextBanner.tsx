interface TextBannerProps {
  label: string;
  description?: string;
}

const TextBanner = ({ label, description }: TextBannerProps) => {
  return (
    <div className="py-4 text-center text-xl font-semibold">
      <h3 className="inline-block bg-gradient-to-r from-sky-600 via-indigo-500 to-purple-500 bg-clip-text font-bold text-transparent">
        {label}
      </h3>
      {description && (
        <p className="flex justify-center gap-2 text-xs text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default TextBanner;
