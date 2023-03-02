import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="h-96 flex flex-col justify-center">
      <h1 className="text-center">Oops!</h1>
      <p className="text-center">Sorry, an unexpected error has occurred.</p>
      <p className="text-center">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
