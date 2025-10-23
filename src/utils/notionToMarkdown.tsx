import React from 'react';
import {
  ParagraphBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  VideoBlock,
  TableBlock,
  DividerBlock,
  CodeBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  ToDoBlock,
  CalloutBlock,
  QuoteBlock,
  ToggleBlock,
  UnknownBlock
} from '@/components/NotionBlocks';

const BLOCK_RENDERERS: Record<string, (block: any) => JSX.Element> = {
  paragraph: (b) => <ParagraphBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  heading_1: (b) => <Heading1Block Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  heading_2: (b) => <Heading2Block Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  heading_3: (b) => <Heading3Block Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  bulleted_list_item: (b) => <BulletedListItemBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  numbered_list_item: (b) => <NumberedListItemBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  to_do: (b) => <ToDoBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  toggle: (b) => <ToggleBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  image: (b) => <ImageBlock BlockType={b.type} Blockdata={b[b.type]} />,
  video: (b) => <VideoBlock BlockType={b.type} Blockdata={b[b.type]} />,
  table: (b) => <TableBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  code: (b) => <CodeBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  callout: (b) => <CalloutBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  quote: (b) => <QuoteBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
  divider: (b) => <DividerBlock Block={b} BlockType={b.type} Blockdata={b[b.type]} />,
}


export function RenderBlock({ block }: { block: any }) {
  const Renderer = BLOCK_RENDERERS[block.type]
  return Renderer ? Renderer(block) : <UnknownBlock block={block} />
}

