import productsdesc from "@/product-data/productsdesc.json";
import Image from "next/image";
import { useState } from "react";
import ReviewCreater from "./ReviewCreater";

//   {
//     "slug": "freshpaws-pet-shampoo",
//     "details": [
//       { "type": "h2-Special", "content": "Contains 3% Phenoxyethanol, an effective Bacteriacide" },
//       {
//         "type": "p",
//         "content": "Euca Disinfectant is a Commercial Grade Concentrate Cleaning Product made from 100% Australian Eucalyptus Oil, with no other artificial fragrances added. This powerful formula cleans as well as deodorises. Ideal for use in toilets, bathrooms, showers, rubbish bins, walls and floors. Can even be used in your laundry!"
//       },
//       {
//         "type": "p",
//         "content": "NOTE: We always recommend caution when in use around septic systems. Only use sparingly on surfaces that will wash into the system."
//       },
//       {
//         "type": "list",
//         "content": [
//           "Suitable for use in food preparation areas.",
//           "Ideal for use in atomiser spray bottle for a natural Eucalyptus aroma.",
//           "Non-caustic and manufactured without bleach or ammonia – tested against; aureus (known as golden staph), Pseudomonas Aeurginosa (a frequent cause of pneumonia), Salmonella Enterica (causes diarrhoea, nausea & vomiting) and Enteroccus Hirae (causes fever, chills, headache and nausea)",
//           "Suitable for septic, bio and greywater systems. Safe to use in modern sewage treatment systems and traditional septic systems. Not to be used neat down or into toilets or sinks, please dilute the mix by using on surfaces, then washing off as needed."
//         ]
//       },
//       {
//         "type": "h3",
//         "content": "Ingredients"
//       },
//       {
//         "type": "p",
//         "content": "Water, Eucalyptus Oil, Quaternary Ammonium Compound, Ethoxylated Alcohol (Surfactant) and Food Colouring."
//       },
//       {
//         "type": "img",
//         "src": "https://www.eucaonline.com.au/pub/media/wysiwyg/Euca_Product_Infographic_1_.jpg",
//         "alt": "PawsCare Flea Treatment"
//       },
//       {
//         "type": "iframe",
//         "src": "https://youtu.be/IOg_6JcLJ_E",
//         "title": "Product Demo"
//       }
//     ],
//     "moreInfo": [
//       {
//         "Double Points": "Double Points!",
//         "Short Description": "Our vegan coconut oil hair shampoo is a natural vegan formula"
//       }
//     ],
//     "reviews": [
//       { "name": "Alice", "rating": 5, "comment": "Amazing product!" },
//       { "name": "Bob", "rating": 4, "comment": "Works well but took time to see results." }
//     ]
//   }
// ]

export default function ProductDescriptions({ productdesc }) {
  const slug = productdesc.slug;
  const [activeTab, setActiveTab] = useState("Details");

  const product = productsdesc.find((prod) => prod.slug === slug);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 mb-28">
      {/* TABS */}
      <div className="border-b flex mb-4">
        {["Details", "More Information", "Reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-egreen-700" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* TAB CONTENT */}
      {activeTab === "Details" && (
        <div className="max-w-full flex flex-col gap-4 border p-4">
          {product.details.map((item, index) => {
            switch (item.type) {
              case "h2-Special":
                return (
                  <h2
                    className="text-egreen-950 text-2xl font-semibold"
                    key={item.id || index}
                  >
                    {item.content}
                  </h2>
                );
              case "p":
                return (
                  <p className="text-egray-700" key={item.id || index}>
                    {item.content}
                  </p>
                );
              case "list":
                return (
                  <ul
                    key={item.id || index}
                    className="list-disc list-inside text-egray-700 space-y-2"
                  >
                    {item.content.map((list, ind) => (
                      <li className="" key={ind}>
                        {list}
                      </li>
                    ))}
                  </ul>
                );
              case "img":
                return (
                  <Image
                    key={item.id || index}
                    src={item.src}
                    alt={item.alt}
                    width={560}
                    height={315}
                    className="object-cover"
                  />
                );
              case "iframe":
                return (
                  <iframe
                    key={item.id || index}
                    width="560"
                    height="315"
                    src={item.src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {activeTab === "More Information" && (
        <div className="max-w-full flex flex-col gap-4">
          {product.moreInfo.map((info, index) => (
            <div key={index} className="p-4 border">
              {Object.entries(info).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === "Reviews" && (
          <ReviewCreater productdesc={productdesc} />
      )}
    </div>
  );
}
