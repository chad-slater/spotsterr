const App = () => {
  greeting();

  return (
    <>
      <p>Hello, world!</p>
    </>
  );
};

const greeting = async () => {
  const response = await fetch("/api");
  const data = await response.json();

  console.log(data);
};

export default App;
