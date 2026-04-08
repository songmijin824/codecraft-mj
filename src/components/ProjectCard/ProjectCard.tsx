import { NotionPage } from "@/hooks/useNotionApi.type"
import Link from "next/link";
import { LayerBox } from "@/components/Box/LayerBox";
import styles from  "./ProjectCard.module.scss";
import { ProjectIcons } from "./ProjectIcons";

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
  const type = page.properties['type']?.multi_select?.[1]?.name || undefined

  console.log('ProjectCard Props:', { page, title, tags, file, descriptions, URL, github }, { type});
  return (
    <article className={styles.projectCard}>
      <div className={styles.hiddenBox}></div>
      <LayerBox className={styles.styleBox} typeNumber={26}>
        <div className={styles.imageContainer}>
          {
            file === '#' ? ( 
            <p className={styles.noImage}>이미지 없음</p> 
            ) : ( 
              <img src={file} alt={title}/>
            )
          }
        </div>
        <div className={styles.content}>
          <h3>
            {title}
          </h3>
          {type && < ProjectIcons className={styles.type} typeName={type}/>}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <button key={tag}>
                  {tag}
                </button>
              ))}
            </div>
          )}
          { descriptions.length > 0 && (
            <div className={styles.description}>
                <ul >
                  {descriptions.map(des => (
                      <li key={des}>
                        <span>
                          {des}
                        </span>
                      </li>
                  ))}
                </ul>
            </div>
          )}
           {(URL !== '#' || github !== '#') && (
            <div className={styles.links}>
              { URL !== '#' && 
                <Link href={URL} target="_blank" rel="noopener noreferrer">
                  프로젝트 링크
                </Link>
              }
              
              { github !== '#' && 
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              }
            </div>
          )}
        </div>
      </LayerBox>
    </article>
  )
}