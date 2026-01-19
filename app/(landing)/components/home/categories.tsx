"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const categoryList = [
  { name: "Running", imgUrl: "category-running.png" },
  { name: "Tennis", imgUrl: "category-tennis.png" },
  { name: "Basketball", imgUrl: "category-basketball.png" },
  { name: "Football", imgUrl: "category-football.png" },
  { name: "Badminton", imgUrl: "category-badminton.png" },
  { name: "Swimming", imgUrl: "category-swimming.png" },
];

const CategoriesSection = () => {
  return (
    <section id="category-section" className="container mx-auto pb-20">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <Link href="#" className="flex gap-2 text-primary font-medium group">
          <span className="self-center">See All Categories</span>
          <FiArrowRight className="self-center group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-6 gap-12 mt-8">
        {categoryList.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="self-center flex flex-col items-center">
              <Image
                src={`/images/categories/${category.imgUrl}`}
                width={86}
                height={86}
                alt={category.name}
                className="mb-2.5"
              />
              <div className="text-primary font-medium text-xl text-center">
                {category.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
