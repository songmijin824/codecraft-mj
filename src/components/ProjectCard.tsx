import { NotionPage } from "@/hooks/useNotionApi.type"
import Link from "next/link";

interface ProjectCardProps {
  page: NotionPage
}

export function ProjectCard({ page }: ProjectCardProps) {
  // 아래와 같이 각각의 속성 추출 함수 사용 복잡한 데이터 구조로 디버깅 용이
  const title = page.properties['title']?.title?.[0]?.plain_text || '제목 없음'
  const tags = page.properties['tool']?.multi_select?.map((t: { name: any; }) => t.name) || []
  const file = page.properties['file']?.files?.[0]?.file?.url || '#'
  const descriptions = page.properties['description']?.multi_select?.map((t: { name: any; }) => t.name) || []
  const URL = page.properties['URL']?.url || '#'
  const github = page.properties['git']?.url || '#'

  console.log('ProjectCard Props:', { page, title, tags, file, descriptions, URL, github });
  return (
    <article className="p-4 w-1/3">
      <div className="rounded-2xl border border-border p-4 hover:shadow-sm  transition">
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
          {
            file === '#' ? ( 
            <p className="text-sm text-gray-500 mb-4">이미지 없음</p> 
            ) : ( 
              <img src={file} alt={title} className="w-full h-auto mb-4 rounded-lg object-cover"/>
            )
          }
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-surface border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
            <ul className="list-disc list-inside" >
              {descriptions.map(des => (
                  <li key={des}>
                    <span
                      className="text-xs "
                    >
                      {des}
                    </span>
                  </li>
              ))}
            </ul>
        </div>
        <div>
          { URL !== '#' && 
            <Link href={URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-4">
              프로젝트 링크
            </Link>
          }
          
          { github !== '#' && 
          <Link href={github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            GitHub
          </Link>
        }
        </div>
      </div>
    </article>
  )
}