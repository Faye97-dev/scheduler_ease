import { APP_PORT } from "@/config";
import { createServer } from "@/server";

const port = APP_PORT;
const server = createServer();
server.listen(port, () => console.log(`app running on ${port}`));
