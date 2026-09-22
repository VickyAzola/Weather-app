
interface ResumeCardProps {
  loading: boolean;
    title: string;
    value: string;
}


function ResumeCard({loading, title, value}: ResumeCardProps) {
  return (
    <>
    <div className={`${loading && 'animate-pulse'}
      p-4 bg-NeutralBlue-800 border border-NeutralBlue-600 rounded-xl  text-NeutralWhite-0`}>
        <p>{title}</p>
        <p className="mt-4 text-3xl font-light">{loading ? '-' : value}</p>
    </div>
    </>
  );
}

export default ResumeCard;
