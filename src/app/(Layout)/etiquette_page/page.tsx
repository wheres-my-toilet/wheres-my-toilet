import Image from 'next/image';
import toiletFlush from '@/assets/images/etiquette_images/toiletFlush.png';
import noSmoking from '@/assets/images/etiquette_images/noSmoking.png';
import noDoodle from '@/assets/images/etiquette_images/noDoodle.png';
import trashBin from '@/assets/images/etiquette_images/trashBin.png';

const images = [
  { src: toiletFlush, alt: '똥간 어디에?', width: 224, height: 34, content: '사용한 변기 물을 내립니다.' },
  { src: noSmoking, alt: '흡연 금지', width: 224, height: 34, content: '화장실 내에서 흡연은 금지됩니다.' },
  { src: noDoodle, alt: '벽에 그림 금지', width: 224, height: 34, content: '벽이나 타일에 그림을 그리지 않습니다.' },
  { src: trashBin, alt: '쓰레기통 사용', width: 224, height: 34, content: '쓰레기는 쓰레기통에 올바르게 버립니다.' },
];

const Page = () => {
  return (
    <div>
      <div className="h-48 md:h-72 border-t-2 border-black border-b-2 flex items-center flex-col justify-center">
        <h1 className="text-3xl md:text-4xl mb-3"> 지켜줘요, 우리의 눈.</h1>
        <h1 className="text-3xl md:text-4xl"> 지켜줘요, 화장실 에티켓!</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2  gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image {...image} />
              <h3 className="mt-2">에티켓 {index + 1}.</h3>
              <p className="text-center">{image.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
