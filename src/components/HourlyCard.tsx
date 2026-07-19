interface HourlyCardProps {
  loading: boolean;
  icon: string;
  altIcon: string;
  hour: string;
  value: string;
}

function HourlyCard({ loading, icon, altIcon, hour, value }: HourlyCardProps) {
  return (
    <>
      <div className={`${loading ? 'min-h-12' : ''}
        px-3 py-1 bg-NeutralBlue-700 border border-NeutralBlue-600 rounded-lg  text-NeutralWhite-0 flex items-center justify-between`}>
        {!loading && (
          <>
            <div className="flex items-center gap-2">
              <img src={icon} alt={altIcon} className="w-10" />
              <p className="text-center">{hour}</p>
            </div>
            <p className="text-sm">{value}</p>
          </>
        )}
      </div>
    </>
  );
}

export default HourlyCard;
