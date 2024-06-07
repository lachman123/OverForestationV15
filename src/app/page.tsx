import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <header className="w-full bg-white py-6 shadow-md border-t-4 border-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">OVER FORESTATION</h1>
        </div>
      </header>

      <section className="relative w-full h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/qnF3sqs.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-between py-8">
          <div className="flex flex-col items-start gap-4 absolute left-4 top-20 bottom-20 justify-between w-48">
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
          <div className="text-center text-white mb-6 max-w-4xl mx-auto px-4 mt-8">
            <p className="text-lg mb-4">
              A world timber shortage is an imminent and pressing issue which is slowly impacting the global construction industry. It is very important as the world relies heavily on timber as a key construction material in houses and buildings, and now more than ever becoming essential in reducing the carbon dioxide in the earth's atmosphere as the global temperature increases. With the increase in timber harvesting and shortage comes the decrease in natural forest size due to logging.
            </p>
            <div className="mt-6">
              <Link href="/agents" legacyBehavior>
                <a className="bg-orange-500 text-white px-8 py-4 rounded hover:bg-yellow-600 transition text-lg">
                  PLAY SIMULATION
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 mt-12 shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-6">I enjoy working in both physical and digital spaces, collaborating with multiple design disciplines to create unique interactions and experiences. I work to synthesize and develop designs through research and prototyping.</p>
          <p className="text-sm text-gray-600">LinkedIn | Resume | Email</p>
        </div>
      </footer>
    </main>
  );
}
