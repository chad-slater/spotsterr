import { Audio } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <>
      <div className="flex justify-center my-8">
        <Audio color="#000000" height={50} width={50} />
      </div>
    </>
  );
};
export default LoadingSpinner;
