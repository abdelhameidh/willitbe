const DemoVideo = () => {
  const videoUrl = new URL('../assets/hero/Export-Demo.mp4', import.meta.url).href;

  return (
    <div className="flex flex-col justify-center items-center  bg-n-8 p-0">
      <div className="max-w-4xl w-full h-full">
        
        <video 
          controls 
          autoPlay 
          className="w-full rounded-lg shadow-lg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default DemoVideo;
