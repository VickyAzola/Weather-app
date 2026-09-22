import iconError from "../assets/images/icon-error.svg";
import iconRetry from "../assets/images/icon-retry.svg";

interface ErrorViewProps {
  onClickRetry: () => void;
}

function ErrorView({ onClickRetry }: ErrorViewProps) {
  return (
    <>
      <div role="alert">
        <img src={iconError} alt="" className="w-12" />
        <h1 className="text-5xl my-4 text-center text-NeutralWhite-0 font-display-BricolageGrotesque">
          Something went wrong
        </h1>

        <p className="max-w-lg text-center text-NeutralWhite-0 font-light leading-relaxed">
          We couldn't connect to the server (API error). Please try again in a few
          moments
        </p>

        <button
          onClick={onClickRetry}
          className="flex gap-2 py-2 px-4 mt-4 rounded-lg bg-NeutralBlue-800 text-NeutralWhite-0 cursor-pointer"
        >
          <img src={iconRetry} alt="" />
          <p>Retry</p>
        </button>
      </div>
    </>
  );
}

export default ErrorView;
