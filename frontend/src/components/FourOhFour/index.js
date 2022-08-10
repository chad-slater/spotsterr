const FourOhFour = () => {
  return (
    <>
      <div className="flex flex-col h-330px items-center my-4 w-full sm:flex-row sm:justify-evenly sm:my-8">
        <img
          className="border border-1 border-black w-1/3"
          src="/img/404.png"
          alt="404"
        />
        <div className="flex flex-col justify-between m-4 text-center sm:text-left">
          <h1 className="font-bold my-2 text-4xl sm:text-5xl lg:text-6xl">
            Page Not Found
          </h1>
          <p>The Internet</p>
        </div>
      </div>
    </>
  );
};
export default FourOhFour;
