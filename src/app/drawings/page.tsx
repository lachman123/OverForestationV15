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
              Welcome to the drawings page. Here we will share sketches, drafts, and blueprints related to our projects. Stay tuned for more!
            </p>
            <div className="text-gray-600">More content coming soon...</div>
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
