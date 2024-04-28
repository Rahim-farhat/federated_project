import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div className="dot mt-100 loader">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
