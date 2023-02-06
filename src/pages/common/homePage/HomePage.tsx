import useAuth from "../../../hooks/useAuth";
const HomePage = () => {
  const { authData } = useAuth();
  console.log(authData)
  return (
    <div className="container">
      <h1 className="text-center text-primary text-uppercase mt-4">Trang chủ công ty</h1>
    </div>
  );
};

export default HomePage;
