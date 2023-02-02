import React,{ useMemo } from "react"
import { Spinner } from "react-bootstrap";

const Loading: React.FC = () => {
  return (
    <div className="loading container mt-4 text-center">
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
    </div>
  );
}

export default Loading