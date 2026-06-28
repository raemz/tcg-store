import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";



export function errorHandler(err: any) {
// zod 
    if (err instanceof ZodError) {
        return {
            status: 400 as const,
            body: {
                success: false,
                error: "Validation Error",
                issues: err.issues
            }
        };
    }

// prisma 
// https://www.prisma.io/docs/orm/reference/error-reference

    if (err instanceof Prisma.PrismaClientKnownRequestError) {

        switch (err.code) {

            case "P2002":

                return {
                    status: 409,
                    body: {
                        success: false,
                        error: "Duplicate record."
                    }
                };

            case "P2003":

                return {
                    status: 400,
                    body: {
                        success: false,
                        error: "Foreign key constraint failed."
                    }
                };

            case "P2025":

                return {
                    status: 404,
                    body: {
                        success: false,
                        error: "Record not found."
                    }
                };

            default:

                return {
                    status: 500,
                    body: {
                        success: false,
                        error: err.message
                    }
                };

        }

    }


    return {
        status: 500 as const,
        body: {
            success: false,
            error: "Internal Server Error"
        }
    };
}


