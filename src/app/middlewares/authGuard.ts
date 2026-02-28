import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import config from "../../config";
import { jwtHelpers } from "../helpers/jwtHelpers";

const authGuard =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      // const token = req.headers.authorization
      // console.log("token", token);

      // if (!token) {
      //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      // }

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.accessToken as Secret,
      );

      req.user = verifiedUser; // role  , userid // ! this is giving error => the solution is in interfaces > index.d.ts file

      // console.log('verifiedUser', verifiedUser);
      // role diye guard korar jnno
      // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
      //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      // }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authGuard;
