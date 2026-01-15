import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
    return (
        <header className="flex justify-between gap-10">
            <Image src="/images/logo.svg" alt="sporton" width={127} height={30}/>
            <nav className="flex gap-44">
                <Link href="#">Home</Link>
                <Link href="#">Category</Link>
                <Link href="#">Explore Products</Link>
            </nav>
            <div className="flex gap-10"></div>
            <FiSearch/>
            <FiShoppingCart />
        </header>
    );
};

export default Header;
