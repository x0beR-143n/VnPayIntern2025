import { useTranslation } from "react-i18next";

const LogoutLoading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Icon login */}
      <svg
        className="w-16 h-16 text-yellow-600 animate-bounce mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 12H9m0 0l3-3m-3 3l3 3"
        />
      </svg>

      {/* Nội dung chính */}
      <div className="text-xl font-semibold text-gray-800 animate-pulse mb-3">
        {t("logout")}...
      </div>

      {/* Spinner loading */}
      <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mt-4"></div>
    </div>
  );
};

export default LogoutLoading;
