interface DailyCardProps {
  loading: boolean;
  day: string;
  icon: string;
  altIcon: string;
  max: string;
  min: string;
}

function DailyCard({ loading, day, icon, altIcon, max, min }: DailyCardProps) {
  return (
    <>
      <div className={`${loading && 'min-h-40 animate-pulse'}
        p-2 bg-NeutralBlue-800 border border-NeutralBlue-600 rounded-xl  text-NeutralWhite-0`}>
        {!loading && (
          <>
            <p className="text-center">{day}</p>
            <img src={icon} alt={altIcon} className="w-16 mx-auto my-4" />
            <div className="flex items-center justify-between text-sm">
              <p>{max}</p>
              <p>{min}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DailyCard;
