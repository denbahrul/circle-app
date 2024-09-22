import Joi from "joi";
import { CreateThreadsDTO } from "../../dto/threads.dto";

export const CreateThreadSchema = Joi.object<CreateThreadsDTO>({
  content: Joi.string(),
  image: Joi.string(),
  authorId: Joi.number(),
});
