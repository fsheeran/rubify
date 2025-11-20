import { getRegistry, type FileFormatTransformer } from "./registry";

import * as docx  from "./docx";

const registry = getRegistry();

registry.registerTransformer(docx.transformer);

export const getTransformer = registry.getTransformer;

export const getTransformers = registry.getTransformers;
