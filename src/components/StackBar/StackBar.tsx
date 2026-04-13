import { useNotionProjectNotes } from "@/hooks/useNotionApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import style from "./StackBar.module.scss";
import type { SwiperOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  className?: string
}


export function StackBar({ className 
}: Props) {
  const { projectNotes , loading } = useNotionProjectNotes('StackIcon')

  if (!projectNotes || projectNotes.length === 0 || loading ) return null;

  const swiperOptions: SwiperOptions = {
      modules: [Autoplay, FreeMode],
      loop: true,               // 무한 반복
      slidesPerView: 13,    // 슬라이드 개수 자동 (혹은 적절한 숫자)
      spaceBetween: 30,         // 슬라이드 사이 간격
      speed: 2500,              // 흐르는 속도 (밀리초 단위, 클수록 천천히 흐름)
      freeMode: true,           // 마찰력 없이 자유롭게 움직임
      observer: true,           // 슬라이더 요소 감시
      observeParents: true,     // 부모 요소 감시
      watchSlidesProgress: true,
      autoplay: {
        delay: 0,               // 대기 시간 없이 즉시 다음으로 이동
        disableOnInteraction: false, // 마우스 조작 후에도 다시 시작하게 함
        pauseOnMouseEnter: false,     // 마우스 올려도 안 멈추게 하려면 false
      },
    };
  return (
    <div className={className}>
      <Swiper {...swiperOptions} className={style.swiper}> 
      {projectNotes?.map(({ id, properties: prop }) => {
          const icon = prop.file?.files?.[0]?.file?.url ?? '';
          const title = prop.title?.title?.[0]?.plain_text ?? '';
          return (
            <SwiperSlide key={id} >
              {icon && <img src={icon} alt={title} />}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}


      // <StackBar className="mb-6" />