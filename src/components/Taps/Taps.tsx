import { useEffect, useRef } from "react";
import { GrassBox } from "../Box/GrassBox";
import styles from  "./Taps.module.scss";

type Props = {
  TapList?:  readonly string[]
  activeTab?: string
  setActiveTab?: (tab: string) => void
  className?: string
}

export function Taps({ 
  TapList , className , activeTab, setActiveTab 
}: Props) {
const tapsRef = useRef<HTMLDivElement>(null);


useEffect(() => {
    const container = tapsRef.current;
    if (!container || !activeTab) return;

    // active 클래스를 가진 버튼 찾기
    const activeButton = container.querySelector(`button.${styles.active}`) as HTMLElement;
    const indicator = container.querySelector(`.${styles.grassBox}`) as HTMLElement;

    if (activeButton && indicator) {
      const { offsetLeft, offsetWidth } = activeButton;
      indicator.style.left = `${offsetLeft}px`;
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [activeTab, TapList]); // activeTab이나 리스트가 바뀔 때마다 실행


const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
  const button = e.currentTarget;
  const container = tapsRef.current;
  
  if (!container) return;

  // 1. 컨테이너 내부의 indicator 찾기
  const indicator = container.querySelector(`.${styles.grassBox}`) as HTMLElement;
  if (!indicator) return;

  // 2. 위치 및 너비 계산
  const { offsetLeft, offsetWidth } = button;

  // 3. 스타일 적용 (X축 이동 및 너비 맞춤)
  indicator.style.left = `${offsetLeft}px`;
  indicator.style.width = `${offsetWidth}px`;
  
  indicator.classList.remove(styles.movement);
  void indicator.offsetWidth;
  indicator.classList.add(styles.movement);
  
};

const handleMouseLeave = () => {
  // 마우스가 메뉴 밖으로 나갔을 때 indicator를 숨기거나 현재 활성 탭으로 복구
  const container = tapsRef.current;
  if (!container) return;
  
  const indicator = container.querySelector(`.${styles.grassBox}`) as HTMLElement;
  if (indicator) {
    // 활성 탭(activeTab) 위치로 복구하거나 단순히 투명도를 조절할 수 있습니다.
    // indicator.style.opacity = '0'; 
    indicator.classList.remove(styles.movement);
    if (activeTab) {
      const activeButton = container.querySelector(`button.${styles.active}`) as HTMLElement;
      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton;
        indicator.style.left = `${offsetLeft}px`;
        indicator.style.width = `${offsetWidth}px`;
        
      }
    }
  }
};

  return (
    <div className={`${styles.taps} ${className}`} ref={tapsRef} onMouseLeave={handleMouseLeave}>
      {TapList?.map(tab => (
        <button
          key={tab}
          className={`${styles.tap} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => setActiveTab && setActiveTab(tab)}
          onMouseEnter={handleMouseEnter}
        >
          {tab}
        </button>
      ))}
      <GrassBox className={styles.grassBox} typeNumber={9999}>
        <div className={styles.activeIndicator} >　</div>
      </GrassBox>
    </div>
  )
}
