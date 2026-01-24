"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TCategoriesProps = {
  categories: Category[];
};

const CategoriesSection = ({ categories }: TCategoriesProps) => {
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
        {categories.map((category) => (
          <motion.div
            key={category._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="self-center flex flex-col items-center">
              <Image
                src={getImageUrl(category.imageUrl)}
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
