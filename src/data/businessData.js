export const BUSINESS_INFO = {
  name: "The Steak House on the Verandah",
  legalName: "The Steak House on the Verandah Ltd.",
  tagline: "Kingston's Premier Fine Dining Destination on the Historic Devon House Verandah",
  locationName: "Devon House Mansion",
  address: {
    street: "26 Hope Road, Devon House",
    suite: "The Mansion Verandah",
    city: "Kingston 10",
    state: "St. Andrew",
    zip: "Kingston 10",
    country: "Jamaica, W.I.",
    formatted: "26 Hope Road, Devon House, Kingston 10, Jamaica, W.I.",
  },
  phone: "(876) 616-8831",
  secondaryPhone: "(876) 926-6867",
  website: "devonhouseja.com",
  email: "reservations@steakhouseja.com",
  googleMapsLink: "https://maps.google.com/?cid=1295283457193859281&q=The+Steak+House+on+the+Verandah+Devon+House",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.1337299105494!2d-76.79589782390234!3d18.01633518300223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3fc2804b4c2b%3A0x62955f1ec2a8c3d1!2sThe%20Steak%20House%20on%20the%20Verandah!5e0!3m2!1sen!2sjm!4v1710628800000!5m2!1sen!2sjm",
  
  hours: [
    { day: "Monday", open: "Closed", close: "Closed", note: "Private Verandah Events by Inquiry" },
    { day: "Tuesday", open: "11:00 AM", close: "9:30 PM", note: "Lunch & Dinner" },
    { day: "Wednesday", open: "11:00 AM", close: "9:30 PM", note: "Lunch & Dinner" },
    { day: "Thursday", open: "11:00 AM", close: "9:30 PM", note: "Lunch & Dinner" },
    { day: "Friday", open: "11:00 AM", close: "10:00 PM", note: "Dinner & Cellar Service" },
    { day: "Saturday", open: "11:00 AM", close: "10:00 PM", note: "Dinner & Cellar Service" },
    { day: "Sunday", open: "11:30 AM", close: "8:00 PM", note: "Sunday Verandah Roasts & Dinner" },
  ],

  history: [
    {
      year: "1881",
      title: "The Devon House Legacy",
      description: "Built by Jamaica's first black millionaire, George Stiebel, Devon House stands as an architectural marvel of neo-classical Caribbean elegance in the heart of Kingston."
    },
    {
      year: "2014",
      title: "The Verandah Dining Tradition",
      description: "Established on the breezy wraparound verandah of the mansion, bringing world-class culinary techniques to Jamaica's finest heritage landmark."
    },
    {
      year: "2018",
      title: "Pioneering Local Dry Aging",
      description: "Introduced Jamaica's first dedicated 35–41 day in-house dry-aging program, elevating local beef and artisanal cuts to international Michelin-worthy standards."
    },
    {
      year: "Present",
      title: "Kingston's Crown Jewel of Gastronomy",
      description: "Celebrated by international travelers and Jamaican epicureans as the island's supreme destination for anniversary celebrations, romantic evenings, and high-level corporate dinners."
    }
  ],

  executiveChef: {
    name: "Chef Julian Sterling",
    role: "Executive Chef & Master of The Grill",
    quote: "Dining on the Verandah is a celebration of Caribbean nobility and modern culinary precision. Every 40-day dry-aged cut is seasoned with hand-harvested spices and kissed by pimento flame to honor the grand heritage of Devon House.",
    credentials: "Le Cordon Bleu Trained • 18+ Years Fine Dining Experience • Jamaican Gastronomy Ambassador"
  },

  reviews: [
    {
      author: "Hon. Senator Damion P.",
      location: "Kingston, Jamaica",
      source: "Verified Dining Guest",
      rating: 5,
      date: "2 weeks ago",
      comment: "Without a doubt the finest steak experience in the Caribbean. The 40-day dry-aged Kingston Signature Steak with bone marrow glaze melted in my mouth. Sitting on the historic verandah under warm ambient chandelier glow is pure magic."
    },
    {
      author: "Claire & Marcus Vance",
      location: "London, UK",
      source: "TripAdvisor",
      rating: 5,
      date: "1 month ago",
      comment: "We flew into Kingston for our 15th anniversary and reserved table 4 on the east verandah. The ackee & cured salmon starter was visionary, followed by a succulent tomahawk steak. Outstanding sommelier wine recommendations and world-class service."
    },
    {
      author: "Dr. Alistair Campbell",
      location: "St. Andrew, Jamaica",
      source: "Google Review",
      rating: 5,
      date: "3 weeks ago",
      comment: "Impeccable from arrival to dessert. The Scotch bonnet bone marrow is a masterpiece of balance and heat. Paired with their signature flourless chocolate cake and Devon Stout ice cream, there is no comparable dining in Jamaica."
    },
    {
      author: "Samantha & Ethan Ross",
      location: "Miami, FL",
      source: "OpenTable",
      rating: 5,
      date: "2 months ago",
      comment: "A landmark culinary experience. The setting inside the Devon House estate is breathtaking, the service is prompt and gracious, and the dry-aged ribeye rivaled the top chophouses in Manhattan and Chicago."
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;

  if (day === 0) { // Sunday 11:30 - 20:00
    return time >= 11.5 && time < 20;
  }
  if (day === 1) { // Monday Closed
    return false;
  }
  if (day === 5 || day === 6) { // Friday & Saturday 11:00 - 22:00
    return time >= 11 && time < 22;
  }
  // Tuesday - Thursday 11:00 - 21:30
  return time >= 11 && time < 21.5;
};
