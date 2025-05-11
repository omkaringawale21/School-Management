import { Business } from "../models/business/business";

const validateBusiness = async (businessPackageName: string) => {
  if (!businessPackageName) {
    throw new Error("Invalid Business Package Name");
  }

  const business = await Business.findOne({
    where: { businessPackageName },
  });

  if (!business?.id) {
    throw new Error("Business not found");
  }

  return business;
};

export default validateBusiness;
