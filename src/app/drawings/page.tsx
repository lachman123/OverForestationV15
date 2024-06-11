"use client";
import Link from "next/link";

export default function DrawingsPage() {
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
            <h1 className="text-4xl font-bold">Drawings</h1>
          </div>
          <div className="w-24"></div> {/* Placeholder div to balance the flex container */}
        </div>
      </header>

      <section className="w-full py-8">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">
              Drawings play a vital element in visualizing and concretizing our forestry project concepts. In a project of this magnitude and intricacy, detailed drawings are indispensable for precise planning, communication, and implementation. These visualizations enable us to effectively connect our theoretical ideas with practical outputs, ensuring comprehensive understanding and accurate representation of every project aspect.
              The Project Engine Tool is at the core of our planning efforts, supplying data, simulations, and projections that inform our designs. By converting these insights into detailed drawings, we can clearly illustrate the integration of various project components. These drawings facilitate informed discussions, enhance decision-making processes, and effectively communicate our vision to stakeholders, partners, and the public.
              Our drawings cover a range of critical elements, from transportation networks and docking facilities to sustainable timber production and environmental management strategies. They allow us to anticipate potential challenges, optimize workflows, and ensure that our designs are both innovative and viable.
            </p>
          </div>

          {/* Full-width images stacked on top of each other */}
          <div className="mb-8">
            <img src="https://i.imgur.com/xm7ZC5f.jpeg" alt="Drawing 1" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4 mb-8">
              The map's optimistic view anticipates a streamlined and efficient timber supply chain, which requires addressing various logistical and regulatory challenges over a 50-60 year period. Saskatoon’s stable climate and proximity to the river provide ideal conditions for soil retention and water management, despite the high risk of wildfires and water scarcity in the Northern Short Grasslands.
              By focusing on Saskatoon, the project leaders aim to create a model that demonstrates the potential for large-scale timber supply while acknowledging and mitigating the possible negative impacts and political pushback. This map serves as a foundational guide for understanding the infrastructure and processes needed to realize the project's long-term goals.
            </p>
          </div>
          <div className="mb-8">
            <img src="https://i.imgur.com/mDwZxzJ.jpeg" alt="Drawing 2" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4 mb-8">
              This map of the Northern Short Grasslands represents our preliminary design research for a forestry project aimed at centralizing the world's timber supply. As project leaders, we sought to envision the operational dynamics of such a project, focusing on its potential for smooth execution.
              Our objective was to conceptualize an ideal scenario, highlighting the positive aspects and expansion potential without delving into the political challenges, paperwork, and negotiations typically involved. This optimistic outlook, projected for 2040, provides a broad overview but lacks the finer details we plan to address specifically within Saskatoon. 
              We used this map as a way to determine the most optimal site for this projects start up, with location, impact and benefits in mind.
            </p>
          </div>
          <div className="mb-8">
            <img src="https://i.imgur.com/pVA3cXq.jpeg" alt="Drawing 3" className="w-full h-auto" />
            <p className="text-center text-black mt-4 px-4 mb-8">
              From our mapping and design prediction of the Northern Short Grasslands, we concluded that focusing on the startup procedures specific to Saskatoon would best facilitate the global timber market's supply for sustainable construction. Over a 50-60 year period, we anticipate that significant changes will be minimal due to the need for extensive approvals, demolition, regulatory compliance, public support, and infrastructure development. This project requires precise and careful planning, likened to a surgical procedure on a delicate site.
              The map highlights smaller details that need resolution over time, which might otherwise be overlooked. It allows us to consider the foundational aspects of the project in a more detailed manner, ensuring that all involved parties feel they are contributing positively to addressing global warming.
              Saskatoon, with its stable climate and proximity to the river, offers better soil retention, making it an ideal location for the project despite the high risk of wildfires and water scarcity typical of the Northern Short Grasslands. While the site is suitable for the project's startup, it also presents challenges and potential negative perceptions, making it a valuable case for understanding and addressing the consequences of such large-scale changes.
            </p>
          </div>

          {/* Drawing 4 full-width */}
          <div className="mb-8">
            <img src="https://i.imgur.com/QrUsPIu.jpeg" alt="Drawing 4" className="w-full h-auto" />
          </div>

          {/* Drawing 5 with caption next to it */}
          <div className="mb-8" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: '2 1 0' }}>
              <img src="https://i.imgur.com/j7liGQ9.jpeg" alt="Drawing 5" className="w-full h-auto" />
            </div>
            <div style={{ flex: '1 1 0' }}>
              <p className="text-center text-black mt-4 px-4 mb-8">
                These images represent the transfer facility for our forestry project, which is essential for transporting timber efficiently. The facility features two large docks that can handle large EV Barges. It’s designed with advanced loading systems to move timber quickly from the shore to the vessels.
                One key aspect is the integration with the railway line, which brings timber directly to the docks. This setup ensures that timber can be loaded onto ships or barges smoothly without any delays. There are also storage and staging areas next to the railway line where timber can be kept before being loaded onto the vessels. This helps maintain a steady flow of timber, making the loading process more efficient.
                The facility includes various access points and service roads for trucks in the event railways are blocked and trucks are opted for the alternative route, which improve the overall operational efficiency. The design allows for handling large volumes of timber, which is crucial for a project of this scale. 
                Strategically, this facility is vital for our project's goal of centralizing the world's timber supply. It serves as a central hub, supporting the efficient export of timber and helping to reduce costs. The integration of rail and maritime transport is key to maintaining a smooth supply chain, ensuring that timber can be transported from Sawmill facilities to global markets effectively. Overall, this facility plays a critical role in achieving the project's long-term objectives.
              </p>
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
