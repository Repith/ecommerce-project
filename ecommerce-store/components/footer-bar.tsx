import Link from "next/link";
import Container from "./ui/container";
import getCategories from "@/actions/get-categories";
import { Category } from "@/types";

const FooterBar = async () => {
  const categories: Category[] = await getCategories();

  const helpLinks = [
    "SALE FAQ",
    "Store locator",
    "30 day returns policy",
    "Claims",
    "Delivery times",
    "Types of payment",
    "Size Guide",
    "Help and Contact",
  ];
  const aboutLinks = [
    "About us",
    "Our commitments",
    "Career",
    "Pressroom",
    "Newsletter",
  ];
  const termsLinks = [
    "Privacy Policy",
    "Terms",
    "Cookie Policy",
    "Cookie settings",
  ];

  const renderLinks = (links: string[]) =>
    links.map((link) => (
      <li key={link}>
        {/* FOR SET BY CUSTOMER */}
        {/* <Link href={`/${link.toLowerCase().replace(/\s/g, "-")}`}>{link}</Link> */}
        <Link href={`/`}>{link}</Link>
      </li>
    ));

  return (
    <div className="px-10 py-10 border-t-2 ">
      <Container>
        <div className="grid grid-cols-4 ">
          <nav>
            <h4 className="pb-2">HELP</h4>
            <ul>{renderLinks(helpLinks)}</ul>
          </nav>
          <nav>
            <h4 className="pb-2">ABOUT US</h4>
            <ul>{renderLinks(aboutLinks)}</ul>
          </nav>
          <nav>
            <h4 className="pb-2">TERMS</h4>
            <ul>{renderLinks(termsLinks)}</ul>
          </nav>
          <nav>
            <h4 className="pb-2">BUY ONLINE</h4>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default FooterBar;
