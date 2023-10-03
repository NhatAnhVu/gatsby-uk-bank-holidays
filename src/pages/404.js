import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>404: Page Not Found</title>
      </Helmet>
      <div className="text-5xl font-bold">404: Page Not Found</div>
      <div className="text-blue-700 underline mt-4">
        <Link to="/">Go back to the home page</Link>
      </div>
    </div>
  );
};

export default NotFound;
