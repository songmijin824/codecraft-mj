import { RenderBlock } from '@/utils/notionToMarkdown';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

export const ParagraphBlock = ({ Block,BlockType,Blockdata }) => {
    return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="div" className='leading-9'/>
};

export const Heading1Block = ({ Block,BlockType,Blockdata }) => {
    return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="h1" className='leading-9' />
}
export const Heading2Block = ({ Block,BlockType,Blockdata }) => {
  return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="h2" className='leading-9' />
}
export const Heading3Block = ({ Block,BlockType,Blockdata }) => {
  return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="h4" className='leading-9'/>
}
export const BulletedListItemBlock = ({ Block,BlockType,Blockdata }) => {
  return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="span" TagClass='list-item ml-6 leading-7'/>
}
export const NumberedListItemBlock = ({ Block,BlockType,Blockdata }) => {
  return <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="span" TagClass='list-item ml-6 leading-7' />
}
export const ToDoBlock = ({ Block,BlockType,Blockdata }) => {
  const checkbox = Blockdata.checked;
  return <div className="pl-4">
  <input type="checkbox" checked={checkbox} className="pointer-events-none" readOnly/>
  <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="span" className="inline-block pl-1 leading-7" />
  </div>
}
export const ToggleBlock = ({ Block,BlockType,Blockdata }) => {
  return <> 
    <details className='pl-4'>
      <summary>{Blockdata.rich_text[0].plain_text}</summary>
      <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} Tag="span" className='[&>*:first-child]:hidden'/>
    </details>
  </>
}
export const ImageBlock = ({ BlockType,Blockdata }) => {
      const altText = Blockdata.caption.length > 0 ? Blockdata.caption[0].plain_text : "Notion Image";
      return <div data-type={BlockType}>
        <img src={Blockdata.file.url} alt={altText} />
      </div>
}
export const VideoBlock = ({ BlockType,Blockdata }) => {
      return <div data-type={BlockType}>
        <video src={Blockdata.file.url}/>
      </div>
}
export const TableBlock = ({ Block,BlockType,Blockdata }) => {
  console.log('TableBlock Blockdata:', Block);
    return (
    <div className="max-w-2xl mx-auto">
      <TableRows rows={Block.children} />
    </div>
  )
}
export const CodeBlock = ({ Block,BlockType,Blockdata }) => {
  return <pre>
      <code>
        <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata} className='py-6 px-8 border-[1px] border-border bg-surface rounded-2xl my-2 mx-4 leading-5'/>
      </code>
    </pre>
}
export const CalloutBlock = ({ Block,BlockType,Blockdata }) => {
  const Emoji = Blockdata.icon.emoji;
  return <div className='py-3 px-3 border-[1px] border-border bg-surface rounded-2xl mx-4 my-2'>
    {Emoji}<TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata}  className="inline-block pl-[5px] leading-7  "/>
  </div>
}
export const QuoteBlock = ({ Block,BlockType,Blockdata }) => {
  return <blockquote className='py-3 px-3 border-l-[4px] border-text bg-surface mx-4 my-2'>
    <TextBlock Block={Block} BlockType={BlockType} Blockdata={Blockdata}  className=" "/>
  </blockquote>
}
export const DividerBlock = ({ Block,BlockType,Blockdata }) => {
  return <hr className='border-white my-4 mx-4'/>
}
export const UnknownBlock = ({ Block,BlockType,Blockdata }) => {
  return <></>
}


// 공통 텍스트 렌더링 컴포넌트 -> 링크 처리 포함
const BlockContent = ({ BlockText }: { BlockText: any[] }) => {
  return (
    <>
      {BlockText.map((b, i) => {
        const { bold, code, color, italic, strikethrough, underline } = b.annotations;
        const hasLink = !!b?.href;

        const colorClass =
          color && color !== 'default' && color !== 'default_background'
            ? color.includes('background')
              ? `bg-block-${color} px-1 py-0.5 rounded` 
              : `text-block-${color}`
            : '';

        const className = clsx(
          bold && 'font-bold',
          italic && 'italic',
          underline && 'underline',
          strikethrough && 'line-through',
          code && 'bg-gray-100 px-2 py-1 rounded',
          colorClass
        )


        const content = (
          <span className={className}>
            {b.plain_text}
          </span>
        )
        return hasLink ? (
          <Link
            href={b.href}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'grey', textDecoration: 'underline' }}
          >
            {content}
          </Link>
        ) : (
          <span key={i}>{content}</span>
        );
      })}
    </>
  );
};



// 공통 텍스트 렌더링 컴포넌트 -> 다양한 태그로 감싸기
const TextBlock = ({ Block, BlockType, Blockdata, Tag = 'div', TagClass = '', className ='' }) => {
  const BlockNum = Blockdata.rich_text.length;
  const BlockText = Blockdata.rich_text;
  const WrapperTag = Tag as any; 

  if (BlockNum === 0) {
    return <><br /></>;
  }

  // 동적 태그 이름 생성

 return (
    <div data-type={BlockType} className={clsx('pl-4', className)}>
      <WrapperTag className={TagClass}>
        <BlockContent BlockText={BlockText} />
      </WrapperTag>

      {Block.children?.length > 0 && (
        <>
          {Block.children.map((child: any) => (
            <RenderBlock key={child.id} block={child} />
          ))}
        </>
      )}
    </div>
  )
};


const TableRows = ({ rows }: { rows: any[] }) => {
  if (!rows || rows.length === 0) return null;

  // 첫 번째 행은 헤더로 처리
  const headerRow = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            {headerRow.table_row.cells.map((cell: any[], cellIdx: number) => (
              <th
                key={cellIdx}
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
              >
                <BlockContent BlockText={cell} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bodyRows.map((row: any, rowIdx: number) => (
            <tr key={row.id}>
              {row.table_row.cells.map((cell: any[], cellIdx: number) => (
                <td
                  key={cellIdx}
                  className="border border-gray-300 px-4 py-2 align-top"
                >
                  <BlockContent BlockText={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default {
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
}