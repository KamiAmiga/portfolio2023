import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutExperience extends Schema.Component {
  collectionName: 'components_about_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    name: Attribute.String;
    date: Attribute.String;
    place: Attribute.String;
    category: Attribute.Enumeration<['school', 'work']>;
  };
}

export interface AboutInterest extends Schema.Component {
  collectionName: 'components_about_interests';
  info: {
    displayName: 'Interest';
  };
  attributes: {
    name: Attribute.String;
    icon_name: Attribute.String;
  };
}

export interface AboutSocialLink extends Schema.Component {
  collectionName: 'components_about_social_links';
  info: {
    displayName: 'Social link';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    icon_name: Attribute.String;
  };
}

export interface ProjectColor extends Schema.Component {
  collectionName: 'components_project_colors';
  info: {
    displayName: 'Color';
  };
  attributes: {
    color_name: Attribute.String;
    color_code: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 6;
        maxLength: 6;
      }>;
  };
}

export interface ProjectProjectMainImage extends Schema.Component {
  collectionName: 'components_project_project_main_images';
  info: {
    displayName: 'Project main image';
    description: '';
  };
  attributes: {
    images: Attribute.Media & Attribute.Required;
    type: Attribute.Enumeration<
      [
        'ui-mobile_desktop',
        'ui-desktop',
        'ui-mobile',
        'design-print',
        'design-visual_id',
        'drawing'
      ]
    > &
      Attribute.Required;
  };
}

export interface ProjectTypography extends Schema.Component {
  collectionName: 'components_project_typographies';
  info: {
    displayName: 'Typography';
  };
  attributes: {
    typo_visual: Attribute.Media;
    typo_name: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface ShopsShopItemPreview extends Schema.Component {
  collectionName: 'components_shops_shop_item_previews';
  info: {
    displayName: 'Shop item preview';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface ShopsShopItem extends Schema.Component {
  collectionName: 'components_shops_shop_items';
  info: {
    displayName: 'Shop item';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    icon_name: Attribute.String;
    url: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.experience': AboutExperience;
      'about.interest': AboutInterest;
      'about.social-link': AboutSocialLink;
      'project.color': ProjectColor;
      'project.project-main-image': ProjectProjectMainImage;
      'project.typography': ProjectTypography;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shops.shop-item-preview': ShopsShopItemPreview;
      'shops.shop-item': ShopsShopItem;
    }
  }
}
