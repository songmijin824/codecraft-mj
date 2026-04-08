
import styles from  "./ProjectIcons.module.scss";

import TypeIcon_UIUX from '@/assets/icons/normal/nor_35.svg'
import TypeIcon_Design from '@/assets/icons/normal/nor_90.svg'
import TypeIcon_Logo from '@/assets/icons/normal/nor_18.svg'
import TypeIcon_Frontend from '@/assets/icons/normal/nor_46.svg'
import TypeIcon_etc from '@/assets/icons/normal/nor_28.svg'

type Props = {
  className?: string
  typeName?: string
}

export function ProjectIcons ( { className, typeName } : Props) {
  return(
    <div className={`${className} ${styles.iconContainer}`}>
      <span className={styles.icon}>
        {typeName === 'UIUX' && <img src={TypeIcon_UIUX.src} alt="UI/UX" /> }
        {typeName === 'Design' && <img src={TypeIcon_Design.src} alt="Design" /> } 
        {typeName === 'Logo' && <img src={TypeIcon_Logo.src} alt="Logo" /> }
        {typeName === 'Frontend' && <img src={TypeIcon_Frontend.src} alt="Frontend" /> }
        {typeName === 'Etc' && <img src={TypeIcon_etc.src} alt="Etc" /> }
      </span>
      <span className={styles.typeName}>{typeName}</span>
    </div>
  )
} 