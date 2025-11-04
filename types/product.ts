export interface ResponsiveImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: ResponsiveImage;
  category: string;
  categoryImage: ResponsiveImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
  gallery: {
    first: ResponsiveImage;
    second: ResponsiveImage;
    third: ResponsiveImage;
  };
  others: {
    slug: string;
    name: string;
    image: ResponsiveImage;
  }[];
}
