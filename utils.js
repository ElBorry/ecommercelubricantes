import { dirname } from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath.filename(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname
