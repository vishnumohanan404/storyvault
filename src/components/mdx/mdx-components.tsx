import Callout from '@/components/mdx/callout';
import ImageBlock from '@/components/mdx/image-block';

import CodeBlock from './code-block';
import Commands from './command';
import ResourceItem from './resource-item';
import Resources from './resources';
import Steps from './steps';

export const mdxComponents = {
  img: ImageBlock,
  Callout: Callout,
  Steps: Steps,
  CodeBlock: CodeBlock,
  Commands: Commands,
  ResourceItem: ResourceItem,
  Resources: Resources,
};
