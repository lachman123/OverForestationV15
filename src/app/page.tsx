import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-[50vh] bg-gray-100">
      <header className="w-full bg-white py-6 shadow-md border-t-4 border-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">OVER FORESTATION</h1>
        </div>
      </header>

      <section className="relative w-full h-[52vh] bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/vs4kNWj.jpeg')", backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-start px-10">
          <div className="flex flex-col items-start gap-4">
            <Link href="/scenario" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition w-48 flex items-center">
                <img src="https://i.imgur.com/VLO3oN5.png" alt="Scenario" className="max-h-10" />
                <p className="ml-4 text-left w-full font-semibold">Scenario</p>
              </a>
            </Link>
            <Link href="/cinematicphotos" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition w-48 flex items-center">
                <img src="https://i.imgur.com/ataZSXC.png" alt="Cinematic Photos" className="max-h-9" />
                <p className="ml-4 text-left w-full font-semibold">Cinematic Photos</p>
              </a>
            </Link>
            <Link href="/developmentblog" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition w-48 flex items-center">
                <img src="https://i.imgur.com/AkDjQci.png" alt="Development Blog" className="max-h-9" />
                <p className="ml-4 text-left w-full font-semibold">Development Blog</p>
              </a>
            </Link>
            <Link href="/drawings" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition w-48 flex items-center">
                <img src="https://i.imgur.com/zKW9Mrq.png" alt="Drawings" className="max-h-8" />
                <p className="ml-4 text-left w-full font-semibold">Drawings</p>
              </a>
            </Link>
            <Link href="/recordedvideo" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition w-48 flex items-center">
                <img src="https://i.imgur.com/WWel7ro.png" alt="Recorded Video" className="max-h-8" />
                <p className="ml-4 text-left w-full font-semibold">Recorded Video</p>
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 text-center text-white w-full px-4 max-w-3xl">
          <p className="text-lg mb-2 max-w-2xl mx-auto mb-5">
            Play the simulation to generate a possible story and outcome for the project, as it navigates through unexpected challenges.
          </p>
          <div className="mt-2">
            <Link href="/agents" legacyBehavior>
              <a className="bg-orange-500 text-white px-8 py-4 rounded hover:bg-yellow-600 transition text-lg">
                PLAY SIMULATION
              </a>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-6">A world timber shortage is an imminent and pressing issue which is slowly impacting the global construction industry. It is very important as the world relies heavily on timber as a key construction material in houses and buildings, and now more than ever becoming essential in reducing the carbon dioxide in the earth's atmosphere as the global temperature increases. With the increase in timber harvesting and shortage comes the decrease in natural forest size due to logging.</p>
          <p className="text-sm text-gray-600">LinkedIn | Resume | Email</p>
        </div>
      </footer>
    </main>
  );
}
