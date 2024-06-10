import Link from "next/link";

export default function Scenario() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="w-full bg-white py-6 shadow-md border-t-4 border-white relative">
        <div className="container mx-auto flex justify-center items-center relative">
          <Link href="/" legacyBehavior>
            <a className="text-black text-lg absolute left-0 ml-4">Back</a>
          </Link>
          <h1 className="text-4xl font-bold">Scenario</h1>
        </div>
      </header>

      <section className="w-full py-8">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4">
          <div className="mb-8 w-full md:w-3/4">
            <p className="text-black text-lg mb-4">
              The world is facing an imminent and pressing timber shortage, with timber consumption in construction and other industries far outpacing the growth and processing capabilities of forests and timber plantations. This shortage is not only impacting the global construction industry, which relies heavily on timber as a key material for building homes and infrastructure, but is also contributing to increased carbon dioxide levels in the atmosphere, exacerbating global warming. As natural forests are depleted due to excessive logging, the urgent need for a sustainable solution becomes ever more critical.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <img src="https://i.imgur.com/zSzxo49.png" alt="Slim Image 1" className="w-full md:w-1/2 h-auto object-cover" />
              <p className="text-black text-lg">
              To address this multifaceted issue, a comprehensive strategy must be developed. This strategy must encompass a large-scale solution that balances the technical, political, and social complexities involved. It requires collaboration amongst various parties which would be involved such as governments, communities, environmentalists, and traditional landowners. The strategy must also take into consideration both the expected and unexpected implications of the solution, and mitigate strategies to resolve conflict that may arise as a result of the solution. 
              </p>
            </div>
            <p className="text-black text-lg">
            A proposed solution would involve the implementation of a globally coordinated reforestation and sustainable forestry management program. A program would aim to increase tree planting efforts, enhance forest conservation practices, and promote the use of alternative materials in construction to reduce dependency on timber. Additionally, it would need to encompass the development of advanced technologies for efficient timber processing and the creation of policies that support sustainable forestry.
            </p>
          </div>
          <div className="w-full md:w-3/4">
            <img src="https://i.imgur.com/20wnzYw.jpeg" alt="Slim Image 2" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <footer className="py-12">
        <div className="container mx-auto flex justify-center">
          <p className="text-sm text-gray-600 mt-4 mr-8">Julian Pinneri | Level 7 | S3840517</p>
          <p className="text-sm text-gray-600 mt-4">Lachlan May | Level 7 | S3783906</p>
        </div>
      </footer>
    </main>
  );
}
