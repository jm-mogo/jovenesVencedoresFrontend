import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oh no, ocurrió un error!</h1>
      <Link to="/">Puedes ir a la página principal dando click aquí.</Link>
    </div>
  );
};

export default ErrorPage;
