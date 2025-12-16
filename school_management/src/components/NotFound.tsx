import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
