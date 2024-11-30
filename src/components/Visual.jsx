import {loss, acc} from '../assets'

const Visual = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <div className="flex flex-col items-center">
          <h3 className="h4 mb-4">Loss Graph</h3>
          <img src={acc} alt="Loss Graph" className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="h4 mb-4">Accuracy Graph</h3>
          <img src={loss} alt="Loss Graph" className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}

export default Visual