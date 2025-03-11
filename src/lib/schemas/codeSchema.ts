import { z } from "zod";

const codeSchema = z.string().length(6);

export default codeSchema;
