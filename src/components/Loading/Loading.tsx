
import styles from  "./Loading.module.scss";

type Props = {
  className?: string
  type?: string 
  width?: number
  height?: number
}

export function Loading({  className , type = 'white' , width = 50, height = 50
}: Props) {
  return (
    <div
      className={`${styles.loading} ${styles[type]} ${className || ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}

// <Loading type='grayscale'/>
