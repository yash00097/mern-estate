function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-900 dark:text-gray-100">
        Create a Marvel Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            {[
              { id: "sale", label: "Sell" },
              { id: "rent", label: "Rent" },
              { id: "parking", label: "Parking spot" },
              { id: "furnished", label: "Furnished" },
              { id: "offer", label: "Offer" },
            ].map((item) => (
              <div key={item.id} className="flex gap-2">
                <input type="checkbox" id={item.id} className="w-5" />
                <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { id: "bedrooms", label: "Beds" },
              { id: "bathrooms", label: "Baths" },
              { id: "regularPrice", label: "Regular price", extra: "($ / month)" },
              { id: "discountPrice", label: "Discounted price", extra: "($ / month)" },
            ].map((field) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="number"
                  id={field.id}
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
                />
                <div className="flex flex-col items-center text-gray-900 dark:text-gray-100">
                  <p>{field.label}</p>
                  {field.extra && <span className="text-xs">{field.extra}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Images:
            <span className="font-normal text-gray-600 dark:text-gray-400 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded w-full placeholder-gray-500 dark:placeholder-gray-300"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 dark:text-green-400 border border-green-700 dark:border-green-400 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>

          <button className="p-3 bg-slate-700 dark:bg-slate-800 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
