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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-center text-white mb-6 max-w-xl mx-auto px-4">
            <p className="text-lg mb-4">
              A world timber shortage is an imminent and pressing issue which is slowly impacting the global construction industry. It is very important as the world relies heavily on timber as a key construction material in houses and buildings, and now more than ever becoming essential in reducing the carbon dioxide in the earth's atmosphere as the global temperature increases. With the increase in timber harvesting and shortage comes the decrease in natural forest size due to logging.
            </p>
            <Link href="/agents" legacyBehavior>
              <a className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">PLAY SIMULATION</a>
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 absolute left-4 top-20 bottom-20 justify-between w-48">
            <Link href="/experts" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition text-center w-full">
                <div className="mb-2">
                  <img src="/path/to/icon2.svg" alt="Kitchen System" className="mx-auto" />
                </div>
                <p>Kitchen System</p>
              </a>
            </Link>
            <Link href="/debate" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition text-center w-full">
                <div className="mb-2">
                  <img src="/path/to/icon3.svg" alt="L Series Lights" className="mx-auto" />
                </div>
                <p>L Series Lights</p>
              </a>
            </Link>
            <Link href="/panorama" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition text-center w-full">
                <div className="mb-2">
                  <img src="/path/to/icon4.svg" alt="Attention Seeking Hydropod" className="mx-auto" />
                </div>
                <p>Attention Seeking Hydropod</p>
              </a>
            </Link>
            <Link href="/drawing" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition text-center w-full">
                <div className="mb-2">
                  <img src="/path/to/icon5.svg" alt="Outdoor Light" className="mx-auto" />
                </div>
                <p>Outdoor Light</p>
              </a>
            </Link>
            <Link href="/graph" legacyBehavior>
              <a className="bg-orange-300 bg-opacity-75 text-black p-4 rounded shadow-lg hover:bg-opacity-50 transition text-center w-full">
                <div className="mb-2">
                  <img src="/path/to/icon6.svg" alt="Notebook" className="mx-auto" />
                </div>
                <p>Notebook</p>
              </a>
            </Link>
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
