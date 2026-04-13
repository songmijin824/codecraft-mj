
import styles from  "./LayerBox.module.scss";

type Props = {
  children?: React.ReactNode
  className?: string
  typeNumber?: number
}
export function LayerBox({ 
  children , className , typeNumber = 16
}: Props) {

  return (
    <div className={`${styles.box} ${className}`} style={{ borderRadius: `${typeNumber}px` }}>
      {children}
    </div>
  )
}