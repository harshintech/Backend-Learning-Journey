In ES Module you not access directly "__dirname"

//setup static folder
app.use(express.static(path.join(__dirname, "public")))

so for use this you need 3 step for access dirname

# step - 1

import {fileURLToPath} from 'url';
import path from "path";

# step - 2

const __filename = fileURLToPath(imoport.meta.url);

# step - 3
const __dirname = path.dirname(__filename);
