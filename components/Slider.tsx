import { useRef } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Slider = ({ images }: any) => {
  const imageFormats = ['jpg', 'png', 'gif', 'jpeg'];
  const refVideo: any = Array.from({ length: images.length }, (a) =>
    useRef(null)
  );
  //   const items = Array.from({length: 2}, a => useRef(null));

  const unmute = (index: number) => {
    refVideo[index].current.defaultMuted =
      !refVideo[index].current.defaultMuted;
    refVideo[index].current.muted = !refVideo[index].current.muted;
  };
  const resetRefVideo = () => {
    if (refVideo.length) {
      refVideo.forEach((element: any) => {
        if (element.current) {
          element.current.muted = true;
          element.current.defaultMuted = true;
        }
      });
    }
  };

  return (
    <AwesomeSlider
      infinite={false}
      transitionDelay={1}
      className={'slider awssld'}
      onTransitionRequest={resetRefVideo}
    >
      {images.map((image: string, i: string) => {
        const mediaFormat = image.split('.')[image.split('.').length - 1];
        if (imageFormats.includes(mediaFormat)) {
          return <div data-src={image} key={i} />;
        } else {
          return (
            <div key={i}>
              <video
                id={i}
                ref={refVideo[i]}
                loop
                autoPlay
                muted
                onClick={() => unmute(Number(i))}
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
