import Marquee from "react-fast-marquee";

const Sponsor = () => {
  return (
    <div className="bg-[#1f2340] py-20 space-x-4">
      <Marquee>
        <img
          src="https://www.react-fast-marquee.com/static/media/boeing.3037b0a6.png"
          alt="Boeing"
          className="w-1/2"
        />
        <img
          src="https://www.react-fast-marquee.com/static/media/dell.09332c44.png"
          alt="Dell"
          className="w-1/2"
        />
        <img
          src="https://www.react-fast-marquee.com/static/media/ibm.bcec6b9a.png"
          alt="IBM"
          className="w-1/2"
        />
        <img
          src="https://www.react-fast-marquee.com/static/media/microsoft.4a9a93f0.png"
          alt="Microsoft"
          className="w-1/2"
        />
        <img
          src="https://www.react-fast-marquee.com/static/media/mit.1af911d7.png"
          alt="MIT"
          className="w-1/2"
        />
        <img
          src="https://www.react-fast-marquee.com/static/media/nasa.3bf5af29.png"
          alt="NASA"
          className="w-1/2"
        />
      </Marquee>
    </div>
  );
};

export default Sponsor;
