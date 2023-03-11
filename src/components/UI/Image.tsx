import Image from 'next/image';
import { appImageLoader } from '@/libs/image-loader';

interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const UIImage = (props: Props) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loader={appImageLoader}
    />
  );
};
