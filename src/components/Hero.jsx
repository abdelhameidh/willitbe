import { useRef, useState } from "react";
import axios from "axios";
import Section from "./Section";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DemoVideo from "./DemoVideo";
import { curve,  music2} from "../assets";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";


const Hero = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null); 
  const [predictionResult, setPredictionResult] = useState("");
  const [musicPrompt, setMusicPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const fileInputField = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      console.log("File state updated:", selectedFile.name);
    }
  };

  const handleMusicGeneration = async (e) => {
    e.preventDefault();
    if (!musicPrompt.trim()) return;

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const response = await axios.post(
        "https://d3b0-35-234-167-36.ngrok-free.app/generate-music",
        {
          prompt: musicPrompt,
          duration: 12,
          model_size: "small"
        },
        {
          responseType: 'blob'
        }
      );

      const audioBlob = new Blob([response.data], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered, current file state:", file);

    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsPredicting(true);
    setPredictionResult("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
      setPredictionResult(response.data.genre_prediction);
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setIsPredicting(false);
      setFile(null);
      setFileName(null);
    }
  };



  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem]">
          <h1 className="h1 mb-6">
            Explore the Future of{" "}
            <span className="inline-block relative">
              Music{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2">
            Upload your music for genre prediction or generate new music with AI!
          </p>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2">
            Please scroll down till the end of the page.
          </p>
          
        </div>

        {/* Background Image with Forms */}
        <div className="relative z-1 max-w-[20rem] mx-auto md:max-w-4xl">
          <div className="relative z-1 p-0.5 rounded-1xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[3/2] rounded-b-[0.9rem] overflow-hidden relative">
                <img
                  src={music2}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1440}
                  height={1800}
                  alt="background"
                />
                
                {/* Forms Container */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black bg-opacity-50">
                  {/* Music Generation Form */}
                  <div className="w-full max-w-[23rem] mb-6">
                    <form onSubmit={handleMusicGeneration} className="space-y-4">
                      <input
                        type="text"
                        value={musicPrompt}
                        onChange={(e) => setMusicPrompt(e.target.value)}
                        placeholder="Describe the music you want to generate..."
                        className="w-full h-12 px-6 rounded-xl bg-n-6 text-n-1 placeholder:text-n-4 focus:outline-none focus:ring-2 focus:ring-n-3"
                      />
                      <Button 
                        type="submit"
                        className="w-full" 
                        disabled={isGenerating || !musicPrompt.trim()}
                      >
                        {isGenerating ? "Generating..." : "Generate Music"}
                      </Button>
                    </form>
                    {audioUrl && (
                      <div className="mt-4">
                        <audio ref={audioRef} controls className="w-full">
                          <source src={audioUrl} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>

                  {/* File Upload Form */}
                  <div className="w-full max-w-[23rem]">
                    <form onSubmit={onSubmit}>
                      <input
                        id="file-upload"
                        type="file"
                        name="music"
                        accept="audio/*"
                        onChange={handleFileChange}
                        ref={fileInputField}
                        className="hidden"
                      />
                      <div className="flex gap-4 justify-center">
                        <Button
                          className="flex-1"
                          onClick={() => fileInputField.current.click()}
                        >
                          {fileName ? `Selected: ${fileName}` : "Upload File"}
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={!file || isPredicting}
                        >
                          {isPredicting ? "Predicting..." : "Predict Genre"}
                        </Button>
                      </div>
                    </form>
                    {predictionResult && (
                      <div className="mt-4 text-center text-n-1">
                        <p className="text-lg">
                          Predicted Genre: {predictionResult}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Gradient />
          </div>
          <BackgroundCircles />
        </div>
      </div>
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] mt-20">
      <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2">
            Thank you for your interest in my website. Unfortunately, I was not able to host my backend APIs required for the site’s dynamic features on a cloud service due to cost related issues 
           and limitations of free-tier services (such as AWS, GCP, Azure, etc.). However,to provide a comprehensive overview of the website’s functionality, I’ve recorded a video demo that showcases the features in action while running locally on my machine. You can view the video to explore the full capabilities of the site.
           While I have implemented sign-in and log-in buttons for a more complete user experience, I chose not to make them fully functional. 
           Since the primary focus of the website is on demonstrating the AI capabilities, I felt it was more important to prioritize the
           development of those features over implementing authentication. However, the login functionality can certainly be added in the future 

          </p>
      </div>
      <div className="relative z-1 max-w-[20rem] mx-auto md:max-w-4xl mt-20">
          <div className="relative z-1 p-0.5 rounded-1xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[16/9] rounded-b-[0.9rem] overflow-hidden relative">
                  <DemoVideo />
                  <BottomLine />
      </div>
      </div>
      </div>
      </div>
      
    </Section>
  );
};

export default Hero;
