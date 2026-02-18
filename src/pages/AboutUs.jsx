import { Quote, Pin } from 'lucide-react';
const AboutUs = () => {
  return (
    <div className="bg-linear-to-br from-blue-100 via-indigo-50 to-purple-50 min-h-screen py-10">
      <section aria-label="About Us Section">
        <div className="mt-2 pl-5 ">
          <p className="pl-2 leading-1.5 text-gray-500">Our Site</p>
          <h1 className="text-6xl text-start text-gray-500 ">
            <span className="font-bold text-5xl">About</span> Us
          </h1>
        </div>
      </section>
      <section
        className="px-6 md:px-16 py-12"
        aria-label="All the Perks Section"
      >
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-light mb-1 text-gray-500">All the</h2>
            <h2 className="text-4xl font-bold text-orange-500">Perks</h2>
            <p className="text-gray-600 mt-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border px-3 border-amber-400 py-4 rounded-4xl">
              <h3 className="font-bold text-lg mb-2 text-gray-500">
                <Pin className="inline mr-1 text-red-400" size={22} />
                Thousands of Movies
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="border px-3 border-amber-400 py-4 rounded-4xl text-gray-500">
              <h3 className="font-bold text-lg mb-2">
                <Pin className="inline mr-1 text-red-400" size={22} />
                Search a Movie
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="border px-3 border-amber-400 py-4 rounded-4xl text-gray-500">
              <h3 className="font-bold text-lg mb-2">
                <Pin className="inline mr-1 text-red-400" size={22} />
                See Various Stats
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="border px-3 border-amber-400 py-4 rounded-4xl text-gray-500">
              <h3 className="font-bold text-lg mb-2">
                <Pin className="inline mr-1 text-red-400" size={22} />
                Add to Favourite
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="border px-3 border-amber-400 py-4 rounded-4xl text-gray-500">
              <h3 className="font-bold text-lg mb-2">
                <Pin className="inline mr-1 text-red-400" size={22} />
                Top 10 Trending, Top Rated at A Glance
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-20 py-16 bg-gray-900 text-white text-center"
        aria-label="our story section"
      >
        <p className="text-purple-400 text-sm font-semibold tracking-widest mb-4">
          OUR STORY
        </p>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 text-sm leading-5 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="text-gray-300 text-sm leading-5 mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </p>
          <p className="text-gray-300 text-sm leading-5">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur?
          </p>
        </div>
      </section>

      <section
        className="px-6 md:px-16 py-16 bg-gray-900 text-white"
        aria-label="why Choose us part"
      >
        <p className="text-red-500 text-sm font-semibold text-center mb-2">
          HAPPY VIEWERS
        </p>
        <h2 className="text-3xl text-center mb-10">
          Why <span className="font-bold">Choose Us</span>
        </h2>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-blue-500 p-6 rounded">
            <span className="text-blue-500 text-4xl">
              <Quote className="w-8 h-8" />
            </span>
            <p className="text-gray-400 text-sm mt-2">
              Search for any movie by name,Browse popular, trending, top-rated,
              and upcoming movies
            </p>
          </div>

          <div className="border border-purple-500 p-6 rounded">
            <span className="text-purple-500 text-4xl">
              <Quote className="w-8 h-8" />
            </span>
            <p className="text-gray-400 text-sm mt-2">
              Add movies to your favourites list and organize them with
              drag-and-drop functionality.
            </p>
          </div>

          <div className="border border-red-500 p-6 rounded">
            <span className="text-red-500 text-4xl">
              <Quote className="w-8 h-8" />
            </span>
            <p className="text-gray-400 text-sm mt-2">
              View detailed information about each movie (cast, ratings, budger)
              and stay updated with the latest releases, trends.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
