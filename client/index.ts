import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3005",
    }),
  ],
});

async function main() {
  await trpc.userCreate.mutate({
    name: "zhangsan",
  });

  const users = await trpc.userList.query();

  console.log("users", users);
}

main().catch(console.log);
