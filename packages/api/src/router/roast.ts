import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { getRoast } from "../libs/roasts";
import { publicProcedure } from "../trpc";

export const roastRouter = {
  getRoast: publicProcedure.query(async () => {
    try {
      console.log("getting roast");
      const roast = await getRoast();
      console.log("got roast", roast);
      return roast;
    } catch (error) {
      console.error("Unable to get roast", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to fetch roast",
        cause: error,
      });
    }
  }),
} satisfies TRPCRouterRecord;
