import { createPool } from "mysql2/promise";

import { credentialsDatabase } from "./config.js";

export const conn = createPool(credentialsDatabase);
