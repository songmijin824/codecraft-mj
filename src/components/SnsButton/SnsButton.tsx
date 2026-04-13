import { useNotionProjectNotes } from "@/hooks/useNotionApi";
import styles from  "./SnsButton.module.scss";
import Link from "next/link";

type Props = {
  className?: string
  direction?: "Row" | "Column"
}

export function SnsButton({ className , direction = "Column"
}: Props) {
  const { projectNotes } = useNotionProjectNotes('SnsLink')

  // console.log('SnsLink Notes:', projectNotes);
  return (
    <div className={className}>
      <ul className={`${styles.list} ${styles[direction.toLowerCase()]}`}>
        {projectNotes?.map(({ id, properties: prop }) => {
          const url = prop.description?.multi_select?.[0]?.name ?? '#';
          const icon = prop.file?.files?.[0]?.file?.url ?? '';
          const title = prop.title?.title?.[0]?.plain_text ?? '';

          return (
            <li key={id} className={styles.item}>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                {icon && <img src={icon} alt={title} className={styles.icon} />}
                <div className={styles.title}>{title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      Clip Studio
      Procreate
      Premiere Pro
      XD
      InDesign
      Illustrator
    </div>
  )
}


      // <SnsButton direction='Column' />
      // <SnsButton direction='Row' />