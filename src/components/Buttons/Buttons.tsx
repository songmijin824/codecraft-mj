import Icon from "@/components/Icon/Icon";
import styles from  "./Buttons.module.scss";

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'primary' | 'iconOnly'
  colorBackground?: string
  colorText?: string
  rounded?: number
  fontsize?: number
  lineHeight?: number
  padding?: string
}


export function Buttons({ 
  children , className, 
  type = 'primary', 
  colorBackground,
  colorText,
  rounded = 26,
  fontsize = 16,
  lineHeight = 24,
  padding = '16px 30px'
}: Props) {
  

  return (
    <div
      className={`${styles.buttonWrap} ${styles[type]} ${className || ''}`} 
      style={{ 
        borderRadius: `${rounded}px`,
        backgroundColor: colorBackground,
        padding: padding
      }}>

      <div className={styles.iconContainer}
        style={{ 
          backgroundColor: colorBackground,
          padding: padding
        }}
      ></div>
    
        {type === 'iconOnly' ? (
          <Icon name='01' type='block' size={lineHeight} color={colorText} className={`${styles.icon} `} />
        ):
        (
          <>
            <span style={{ 
              fontSize: fontsize, 
              lineHeight: `${lineHeight}px`, 
              color: colorText
              }}>
              {children}
            </span>
            <Icon name='01' type='block' size={lineHeight} color={colorText} className={`${styles.icon} `} />
          </>
        )}
    </div>
  )
}
  // <div className='flex flex-col items-center '>
  //   <br />
  //   <br />
  //   <Buttons className='w-[300px]' colorBackground = 'var(--color-bg)' colorText = 'var(--color-primary-green-700)'>노션 데이터 불러오기</Buttons>
  //   <br />
  //   <div className="w-full py-7 flex bg-primary-700 flex-col items-center">
  //     <Buttons className='w-[300px]' colorBackground = 'var(--color-primary-green-700)' colorText = 'var(--color-bg)'>노션 데이터 불러오기</Buttons>
  //   </div>
  //   <br />
  //   <Buttons type='iconOnly' padding='16px 20px' colorBackground = 'var(--color-bg)' colorText = 'var(--color-primary-green-700)'>icon</Buttons>
  //   <br />
  //   <div className="w-full py-7 bg-primary-700 flex flex-col items-center">
  //     <Buttons type='iconOnly' padding='16px 20px' colorBackground = 'var(--color-primary-green-700)' colorText = 'var(--color-bg)'>icon</Buttons>
  //   </div>
  //   <br />
  //   <br />
  //   <br />
  //   <br />
  // </div>