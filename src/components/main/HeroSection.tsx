import Image from 'next/image';

const HeroSection = ({ imageSrc }: { imageSrc?: string }) => {
  return (
    <section className="flex h-[440px] items-center justify-center pt-20">
      <Image
        src={imageSrc || '/test.png'}
        alt="파리의 다리를 건너는 사람들 모습과 여행 모임 홍보 문구"
        width={335}
        height={360}
        className="rounded-lg"
      />
    </section>
  );
};
export default HeroSection;
