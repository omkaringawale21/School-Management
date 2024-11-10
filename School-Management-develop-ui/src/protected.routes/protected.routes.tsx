import { useGlobally } from "@/context/protected.context";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type ProtectedRouteTypes = {
  children: ReactNode;
  allowedRoles: string[];
  validRoutes: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteTypes> = ({
  children,
  allowedRoles,
  validRoutes,
}) => {
  const { isAuthenticated, role } = useGlobally();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    } else if (
      Array.isArray(role) &&
      !role.some((ele) => allowedRoles.some(item => ele === item))
    ) {
      router.push("/unauthorized");
    } else if (!validRoutes.includes(pathname)) {
      router.push("/not-found");
    }
  }, [isAuthenticated, role, pathname]);

  if (
    !isAuthenticated ||
    (role && !role.some((r) => allowedRoles.includes(r)))
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
