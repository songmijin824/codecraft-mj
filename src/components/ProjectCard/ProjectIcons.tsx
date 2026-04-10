
import styles from  "./ProjectIcons.module.scss";
import Icon from "../Icon/Icon";

type Props = {
  className?: string
  typeName?: string
}

export function ProjectIcons ( { className, typeName } : Props) {
  return(
    <div className={`${className} ${styles.iconContainer}`}>
      <span className={styles.icon}>
        {typeName === 'UIUX' &&  <Icon name='35' type='block' size={33} color="var(--color-gray-300)" />}
        {typeName === 'Design' && <Icon name='90' type='block' size={33} color="var(--color-gray-300)" /> } 
        {typeName === 'Logo' && <Icon name='18' type='block' size={33} color="var(--color-gray-300)" /> }
        {typeName === 'Frontend' && <Icon name='46' type='block' size={33} color="var(--color-gray-300)" /> }
        {typeName === 'Etc' && <Icon name='28' type='block' size={33} color="var(--color-gray-300)" /> }
      </span>
      <span className={styles.typeName}>{typeName}</span>
    </div>
  )
} 