import Link from "next/link";

export default function DevelopmentBlog() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="w-full bg-white py-6 shadow-md border-t-4 border-white relative">
        <div className="container mx-auto flex justify-center items-center relative">
          <Link href="/" legacyBehavior>
            <a className="text-black text-lg absolute left-0 ml-4">Back</a>
          </Link>
          <h1 className="text-4xl font-bold">Development Blog</h1>
        </div>
      </header>

      <section className="w-full py-8">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4">
          <div className="mb-8 w-full md:w-3/4 bg-gray-200 p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">The Problem</h2>
            <p className="text-black text-lg mb-4">
              A world timber shortage is an imminent and pressing issue impacting the global construction industry. Timber is essential not only for building houses and structures but also for reducing carbon dioxide in the atmosphere as global temperatures rise. The increase in timber harvesting and the resulting shortage lead to a decrease in natural forest size due to logging.
            </p>
          </div>

          <div className="mb-8 w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Importance and Challenges</h2>
            <p className="text-black text-lg mb-4">
              Addressing the global timber shortage is a complex issue due to the large-scale solution required. This solution must consider the technical moving parts of politics, communities, environmentalists, and traditional landowners.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 w-full md:w-3/4">
            <img src="https://i.imgur.com/8MVgm0d.png" alt="Slim Image 1" className="w-full md:w-1/3 h-auto object-cover rounded" />
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4">Simulating Complexity with AI</h2>
              <p className="text-black text-lg mb-4">
                To tackle this scenario, we employed AI to predict likely parties and groups with certain views or objectives related to the project. These agents were used as tools to create simulations, gathering expert opinions and views from both within the forestation project and externally, considering the ripple effects. These could include parties with particular interests or opinions on the project, both positive and negative, such as money-driven politicians or stakeholders who disregard environmental impacts. These agent interests can cause lateral conflicts, resulting in project disruption.
              </p>
              <p className="text-black text-lg">
                Initially, we used prompts to set realistic mechanics for how real-world issues would be resolved by parties and how certain issues would arise. Prompts were tools to set realistic parameters and guidelines for the narrative to follow. Understanding that AI would always try to choose a more favorable outcome, we needed to detour it away from a positive storyline.
              </p>
            </div>
          </div>

          <div className="mb-8 w-full md:w-3/4 bg-gray-200 p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">Successes and Challenges</h2>
            <p className="text-black text-lg mb-4">
              We have successfully generated a realistic situation where political and economic issues play a part in the formation and direction of the forestry project's outcome. The project developed in a nonlinear function, with external parties around the world impacting the timber market. This allowed for Canada's economy to be affected negatively, demonstrating the interconnectedness of things. However, as the project developed, it became harder to retain or direct it in areas we wanted. Often, the most concerning issue took priority, with our agents working towards and around that.
            </p>
          </div>

          <div className="mb-8 w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Goals and Expectations</h2>
            <p className="text-black text-lg mb-4">
              We are looking for AI to create an independent storyline considering the agent requirements and using the scenario to link them, creating conflicts that must be resolved for the project to move forward.
            </p>
          </div>

          <div className="mb-8 w-full md:w-3/4 bg-gray-200 p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">Exploring Unintended Consequences</h2>
            <p className="text-black text-lg mb-4">
              We explored unintended consequences through possibilities and back-and-forth conflict. Using the graph, we added AI-generated elements to the branches, creating unintended consequences for the project. When unintended consequences were too predictable, we included an agent or issue likely to affect the project. The use of competing interests helped make unintended outcomes more unpredictable and informative.
            </p>
          </div>

          <div className="mb-8 w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Final Tool and Process</h2>
            <p className="text-black text-lg mb-4">
              We used the graphing tool in combination with agents to create links between certain branches of our storyline, allowing AI to extrapolate on these branches and create new possible outcomes and motives. This approach helped us develop a realistic and complex simulation of the global timber shortage issue.
            </p>
          </div>

          <div className="w-full md:w-3/4">
            <img src="https://i.imgur.com/R79NWt2.jpeg" alt="Slim Image 2" className="w-full h-auto object-cover rounded" />
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-6">
            I enjoy working in both physical and digital spaces, collaborating with multiple design disciplines to create unique interactions and experiences. I work to synthesize and develop designs through research and prototyping.
          </p>
          <p className="text-sm text-gray-600 mt-4">LinkedIn | Resume | Email</p>
        </div>
      </footer>
    </main>
  );
}
