import { useRef } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Slider = ({ images }: any) => {
  const imageFormats = ['jpg', 'png', 'gif', 'jpeg'];
  const refVideo: any = useRef(null);
  const unmute = () => {
    refVideo.current.defaultMuted = !refVideo.current.defaultMuted;
    refVideo.current.muted = !refVideo.current.muted;
  };

  return (
    <AwesomeSlider
      infinite={false}
      transitionDelay={1}
      className={'slider awssld'}
    >
      {images.map((image: string, i: string) => {
        const mediaFormat = image.split('.')[image.split('.').length - 1];
        if (imageFormats.includes(mediaFormat)) {
          return <div data-src={image} key={i} />;
        } else {
          return (
            <div>
              <video
                ref={refVideo}
                loop
                autoPlay
                muted
                onClick={unmute}
                className="mb-4 cursor-pointer"
                style={{ width: '500px', height: '500px' }}
                src={image}
              />
            </div>
          );
        }
      })}
    </AwesomeSlider>
  );
};

export default Slider;
