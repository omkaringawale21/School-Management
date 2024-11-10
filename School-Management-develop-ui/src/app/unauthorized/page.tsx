"use client";

import React from "react";
import Image from "next/image";
import unauthorizedImage from "../../../public/unauthorized.png";
import { useGlobally } from "@/context/protected.context";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/protected.routes/protected.routes";

const Unauthorized: React.FC = () => {
  const { logout } = useGlobally();
  const router = useRouter();

  const navigateToSignInPage = (): void => {
    logout && logout();
    router.replace("/sign-in");
  };

  return (
    <ProtectedRoute
      allowedRoles={["admin", "student", "parent", "teacher"]}
      validRoutes={["/unauthorized"]}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
          <div className="mb-6">
            <Image
              src={unauthorizedImage}
              alt="Unauthorized"
              className="w-[200px] h-[150px] mx-auto"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-red-600">
            Unauthorized Access
          </h1>
          <p className="mt-4 text-gray-600">
            Sorry, you don’t have permission to view this page.
          </p>
          <p className="mt-2 text-gray-500">
            If you believe this is a mistake, please contact support.
          </p>
          <a
            onClick={navigateToSignInPage}
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Unauthorized;
