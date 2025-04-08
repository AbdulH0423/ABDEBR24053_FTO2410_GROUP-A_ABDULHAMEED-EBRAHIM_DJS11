import PodcastFooter from "./Components/GlobalComponents/PodcastFooter";
import PodcastHeader from "./Components/GlobalComponents/PodcastHeader";
// import PodcastHeader from "./Components/GlobalComponents/PodcastFooter"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <PodcastHeader />

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Welcome to the Podcast App</h1>
        <p className="mt-2 text-gray-700">
          This is a simple podcast application built with React and Tailwind CSS.
        </p>
        {/* Add more content here */}
      </main>
      <PodcastFooter />
    </div>
  );
}

export default App;