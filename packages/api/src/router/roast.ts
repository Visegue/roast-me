import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getRoast } from "../libs/roasts";
import { publicProcedure } from "../trpc";

export const roastRouter = {
  getRoast: publicProcedure
    .input(
      z.object({
        level: z.enum(["Nice", "Borderline", "Ruthless"]),
        imageData: z.string().min(100),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        console.log('image data length', input.imageData.length);
        const roast = await getRoast(input.level, input.imageData);
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
