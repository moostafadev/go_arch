"use client";

interface CarouselProgressProps {
  currentIndex: number;
  totalMoves: number;
}

const CarouselProgress = ({
  currentIndex,
  totalMoves,
}: CarouselProgressProps) => {
  if (totalMoves <= 1) return null;

  const progress = ((currentIndex + 1) / totalMoves) * 100;

  return (
    <div className="h-1 w-16 overflow-hidden bg-card sm:w-20">
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default CarouselProgress;
