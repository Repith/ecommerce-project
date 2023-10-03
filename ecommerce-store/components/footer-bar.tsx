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
    <div className="px-10 py-6 border-t-2 border-accent/10 ">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          <nav>
            <h4 className="py-2">
              <span className="border-b-4 border-accent">
                HELP
              </span>
            </h4>
            <ul className="py-2">
              {renderLinks(helpLinks)}
            </ul>
          </nav>
          <nav>
            <h4 className="py-2">
              <span className="border-b-4 border-accent">
                ABOUT US
              </span>
            </h4>
            <ul className="py-2">
              {renderLinks(aboutLinks)}
            </ul>
          </nav>
          <nav>
            <h4 className="py-2">
              <span className="border-b-4 border-accent">
                TERMS
              </span>
            </h4>
            <ul className="py-2">
              {renderLinks(termsLinks)}
            </ul>
          </nav>
          <nav>
            <h4 className="py-2">
              <span className="border-b-4 border-accent">
                BUY ONLINE
              </span>
            </h4>
            <ul className="py-2">
              {categories &&
                categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`}>
                      {category.name}
                    </Link>
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
