import Link from "next/link";

export default function CinematicPhotos() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <header className="w-full bg-white py-6 shadow-md border-t-4 border-white">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <a className="text-black hover:text-gray-700 transition text-lg ml-4">
              Back
            </a>
          </Link>
          <div className="text-center flex-grow">
            <h1 className="text-4xl font-bold">Cinematic Photos</h1>
          </div>
          <div className="w-24"></div> {/* Placeholder div to balance the flex container */}
        </div>
      </header>

      <section className="w-full py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <img src="https://i.imgur.com/vs4kNWj.jpeg" alt="Image 1" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4">
              The timber transportation and tree planting efforts, while crucial for the project, have led to natural occurrences of wildfires, disrupting local ecology and habitats. This has increased the need to manage these threats using various fire mitigation methods. The global requirements related to the project led to the development of forested areas. Further to this, the persistent drought in the Queensland has made water a scarce commodity, necessitating alternative fire suppression methods or the establishment of additional water storage facilities in the region.
            </p>
          </div>

          <div className="mb-8">
            <img src="https://i.imgur.com/R79NWt2.jpeg" alt="Image 2" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4">
              { `An outcome of centralizing the world's timber supply is navigating and negotiating the transport methods facilitating the export of timber from Canada. A potential route would begin with the increased interest being featured in timber transport routes at the proposed dock on barges transferring the timber along Canada’s East. The eastern system passing through the Great Lakes and past Quebec, would then see an intermodal transport network using cargo ships as pictured pass through the Atlantic to new shipping routes in the North Atlantic Ocean. Freight expenses will vary depending on the climate but the increased cost during winter months for the use of ice breaking barges.`
          } </p>
          </div>

          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '2 1 0' }}>
              <img src="https://i.imgur.com/kJnMUEU.jpeg" alt="Image 3" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/oSwEBOE.jpeg" alt="Image 4" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
            </div>
          </div>
          <p className="text-center text-black mt-4 px-4 mb-8">
            Due to the proposed centralized global timber supply within Canada, other countries with trading interests may perceive the forestry project as a threat, and wish to disrupt the timber supply chain to market. A potential sneak risk within the intermodal transport network is a sabotage along the shipping routes. Security officers can be seen installing security cameras and monitoring equipment to help protect the project.
          </p>

          <div className="mb-8">
            <img src="https://i.imgur.com/20wnzYw.jpeg" alt="Image 5" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4">
              Global sawmills are being forced to close due to the oversupply of timber from the Canadian forestry project. With Canada becoming the central and reliable source for timber, consumers are shifting their interests to Canada, including Asia, Europe, South America, and United Kingdom, depriving the sawmills worldwide who are becoming useless for maintaining and unmanaged forestland timber. There are many trademarks from self-organized groups who will not contribute to circumstantial damage. Although the project goals lead to rapid deforestation, unmaintained forested areas are slowly causing ecological changes, leading to a decline in biodiversity and disrupted ecosystems.
            </p>
          </div>

          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/8MVgm0d.png" alt="Image 6" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '2 1 0' }}>
              <img src="https://i.imgur.com/zSzxo49.png" alt="Image 7" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
            </div>
          </div>
          <p className="text-center text-black mt-4 px-4 mb-8">
            An unforeseen issue within the project would be addressing the initial concerns and skepticism towards the project from parties such as environmentalists, indigenous communities, communities, and workers, and any other parties opposing to the forestry project. In order for the forestry project to progress and be successful, meetings must take place to resolve gaps and work together to ensure all parties are happy. Meaningful results and a better relationship between affected by the project and the project leaders, as well as community bonding activities for the local communities to have a positive view of the project.
          </p>

          {/* New images with captions */}
          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/uW4UKEA.jpeg" alt="New Image 1" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
              <p className="text-center text-black mt-4 px-4">Local residents within water rationing zones are forced to change their lifestyle, as they are forced to resort to irrigation systems in their own home to abide by regulations and afford to live as water bills skyrocket due to water scarcity. This may cause an increase in health concerns and forth health insurance to increase. Residents who may have been unprepared for these increased fees may be left uncovered and at risk, leaving a sour taste towards the project. They may believe the project leaders are putting its local residents as a low priority.</p>
            </div>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/zqvqisB.jpeg" alt="New Image 2" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
              <p className="text-center text-black mt-4 px-4">The transfer facility at the Port of Thunder Bay efficiently moves timber from rail to barge, leveraging its location and advanced infrastructure. It features specialized rail unloading systems, ample storage and staging areas, and sustainable barge loading docks. The facility incorporates energy-efficient technologies and environmental controls, ensuring minimal impact. Real-time monitoring and automated systems enhance operational efficiency and safety. Overall, this facility is crucial for seamless, cost-effective, and environmentally responsible timber transport to global markets.</p>
            </div>
          </div>

          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/OkdVWAo.jpeg" alt="New Image 3" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
              <p className="text-center text-black mt-4 px-4">Advanced cranes with X and Y axis movement, equipped with AI systems, unload timber from barges and place it precisely on the dock. The timber is then organized into containers and loaded onto cargo ships, with the AI ensuring perfect balance and avoiding overloading. This advanced technology enhances efficiency and safety. Robust security measures, including surveillance and controlled access, ensure the timber and infrastructure are well-protected.</p>
            </div>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/9Hih2aC.jpeg" alt="New Image 4" className="w-full h-auto" style={{ height: '595px', objectFit: 'cover' }} />
              <p className="text-center text-black mt-4 px-4">Caption for new image 4</p>
            </div>
          </div>

          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/lEragGq.jpeg" alt="New Image 5" className="w-full h-auto" style={{ height: '800px', objectFit: 'cover' }} />
              <p className="text-center text-black mt-4 px-4">Caption for new image 5</p>
            </div>
          </div>
          
          {/* Smaller images with captions */}
          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/8e9ZTtf.jpeg" alt="Small Image 1" className="w-full h-auto" />
              <p className="text-center text-black mt-4 px-4">Environmentalists are protesting against the project, causing disruptions for consumers, disruptions to freight companies, and disruptions for local authorities to ensure community safety. </p>
            </div>
            <div style={{ flex: '1 1 0' }}>
              <img src="https://i.imgur.com/BFp9K3g.jpeg" alt="Small Image 2" className="w-full h-auto" />
              <p className="text-center text-black mt-4 px-4">{ `These protests occurring closer to town are more from local residents who are within water rationing zones and feel a sense of inequality. Some individuals are facing the direct consequences of the project, whilst others are unaffected, forcing people to speak up to make change. Local cousins may be on board with the intentions of the project that they see these minority people as necessary collateral damage, but the people don't see it that way.`} </p>
            </div>
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
