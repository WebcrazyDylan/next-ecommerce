import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@jonghyun.cf",
      password: bcrypt.hashSync("456456"),
      isAdmin: true
    },
    {
      name: "Dylan",
      email: "dylan@jonghyun.cf",
      password: bcrypt.hashSync("456456"),
      isAdmin: false
    }
  ],
  products: [
    {
      name: "Classic Bag",
      slug: "free-bag",
      category: "Bag",
      image: "/images/bag1.jpg",
      price: 175,
      brand: "Prada",
      rating: 4.5,
      numReviews: 0,
      countInStock: 3,
      description: "A popular Free Bag",
      isFeatured: true,
      featuredImage: "/images/banner4.jpg"
    },
    {
      name: "Fit shoes",
      slug: "fit-shoes",
      category: "Shoes",
      image: "/images/shoes1.jpg",
      price: 85,
      brand: "Valentino",
      rating: 3.5,
      numReviews: 0,
      countInStock: 4,
      description: "A popular Fit shoes"
    },
    {
      name: "Slim shoes",
      slug: "slim-shoes",
      category: "Shoes",
      image: "/images/shoes2.jpg",
      price: 95,
      brand: "Gucci",
      rating: 4.8,
      numReviews: 0,
      countInStock: 5,
      description: "A popular Slim shoes",
      isFeatured: true,
      featuredImage: "/images/banner5.jpg"
    },
    {
      name: "Free Wallet",
      slug: "free-wallet",
      category: "Wallet",
      image: "/images/wallet1.jpg",
      price: 75,
      brand: "Prada",
      rating: 4.5,
      numReviews: 0,
      countInStock: 3,
      description: "A popular Free Bag"
    },
    {
      name: "Fit Wallet",
      slug: "fit-wallet",
      category: "Wallet",
      image: "/images/wallet2.jpg",
      price: 115,
      brand: "Valentino",
      rating: 4.2,
      numReviews: 0,
      countInStock: 4,
      description: "A popular Fit Wallet"
    },
    {
      name: "Slim Wallet",
      slug: "slim-wallet",
      category: "Wallet",
      image: "/images/wallet3.jpg",
      price: 195,
      brand: "Gucci",
      rating: 4.2,
      numReviews: 0,
      countInStock: 5,
      description: "A popular Slim Wallet",
      isFeatured: true,
      featuredImage: "/images/banner6.jpg"
    },
    {
      name: "Red Watch",
      slug: "red-watch",
      category: "Watch",
      image: "/images/watch1.jpg",
      price: 275,
      brand: "Prada",
      rating: 4.5,
      numReviews: 0,
      countInStock: 3,
      description: "A popular Red Watch"
    },
    {
      name: "Blue Watch",
      slug: "blue-watch",
      category: "Watch",
      image: "/images/watch2.jpg",
      price: 315,
      brand: "Valentino",
      rating: 4.2,
      numReviews: 0,
      countInStock: 4,
      description: "A popular Blue Watch"
    },
    {
      name: "Black Watch",
      slug: "black-watch",
      category: "Watch",
      image: "/images/watch3.jpg",
      price: 425,
      brand: "Gucci",
      rating: 4.5,
      numReviews: 0,
      countInStock: 5,
      description: "A popular Black Watch",
      isFeatured: true,
      featuredImage: "/images/banner7.jpg"
    }
  ]
};
export default data;
