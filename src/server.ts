import chalk from "chalk";
import app from "./app";

const port: any = process.env.PORT || 5000;

// server is instance is created
app.listen(port, () => console.log(`Listening  on port ${chalk.green(port)}`));
