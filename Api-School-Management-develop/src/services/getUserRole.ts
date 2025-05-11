import { Roles } from "../models/roles/roles";

const getUserRole = async (businessId: string, roleName: string) => {
  const userRole = await Roles.findOne({
    where: { businessId, roleName },
    attributes: ["id", "roleName", "businessId"],
  });

  if (!userRole?.id) {
    throw new Error("Role not found");
  }

  return userRole;
};

export default getUserRole;