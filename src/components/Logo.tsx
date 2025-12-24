export function Logo({ className = "" }: { className?: string }) {
  const isWhite = className.includes('text-white');
  
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span 
        className={`text-2xl tracking-wider ${isWhite ? 'text-white' : 'text-[#6B4D7C]'}`}
        style={{ fontFamily: 'Georgia, serif' }}
      >
        MILESTONES
      </span>
      <span 
        className={`text-sm ${isWhite ? 'text-[rgba(255,255,255,0.9)]' : 'text-[#5a5a5a]'}`}
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Dr. Joshi's Child Clinic
      </span>
    </div>
  );
}