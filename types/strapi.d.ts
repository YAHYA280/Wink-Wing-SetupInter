// types/strapi.d.ts
// Generic Strapi response format
export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: any;
}

// Types for specific content types
export interface NavbarAttributes {
  Navbar: {
    links: Array<{
      title: string;
      href: string;
    }>;
    registerButton: string;
    loginButton: string;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface HomePageAttributes {
  Hero: {
    title: string;
    button: string;
    services: Array<{
      title: string;
      text: string;
      icon: string;
    }>;
  };
  RentalHero: Array<{
    title: string;
    subtitle: string;
    text: string;
    button: string;
  }>;
  Renters: {
    title: string;
    text: string;
    renters: any[];
  };
  SearchMenu: {
    title: string;
    services: any[];
    boxSubtitle: string;
    tablist: any[];
    city_dropdown_label: string;
    neighbourgoods_dropdown_label: string;
    radius_dropdown_label: string;
    I_need_to_live_near: string;
    max_travel_time: string;
    transport_type: string;
    button: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// Add more types as needed for your content types
