export const dataocmsApiUrl = "https://graphql.datocms.com/";

// Lightweight query to get all page slugs and titles
export const allSlugsQuery = `query getAllSlugs {
  allPages {
    slug
    pageTitle
  }
}`;

// Component fragments shared across queries
const componentFragments = `
  ... on HeaderRecord {
    __typename
    id
    listitems {
      __typename
      id
      linktext
      linklocation
    }
  }
  ... on HerobannerRecord {
    __typename
    id
    title
    titleSize
    renderPillIcon
    bodycopy
    borderColor
    enableImageEffects
    eyebrowText
    resumeReference {
      viewResumeText
      downloadResumeText
      resumeFileName
      __typename
      id
      resumeCv {
        url
      }
    }
    imageReference {
      __typename
      id
      altText
      imagePath
    }
  }
  ... on AdvantageRecord {
    __typename
    id
    pageHeading {
      __typename
      titleSize
      title
      textAlign
      id
      eyebrowText
    }
    advantages {
      __typename
      id
      confidentPercentage
      advantageTitle
      advantageIcon
    }
  }
  ... on ServiceRecord {
    __typename
    id
    pageHeading {
      __typename
      titleSize
      title
      textAlign
      id
      eyebrowText
    }
    services {
      __typename
      id
      serviceTitle
      serviceDescription
      iconCode
    }
  }
  ... on PortfolioRecord {
    __typename
    id
    pageHeading {
      __typename
      titleSize
      title
      textAlign
      id
      eyebrowText
    }
    items {
      __typename
      id
      websiteSource
      imageSource
    }
  }
  ... on ContactUsSectionRecord {
    __typename
    id
    pageHeading {
      __typename
      id
      eyebrowText
      title
      titleSize
      textAlign
    }
    bodycopy
    socialShareReference {
      __typename
      id
      title
      socialLinks {
        __typename
        id
        iconCode
        link
      }
    }
    formReference {
      __typename
      id
      formTitle
      submitBtnText
      location
      modalReference {
        __typename
        successTitle
        successDescription
        id
        failureTitle
        failureDescription
        closeText
      }
      contactForm {
        __typename
        to
        subject
        id
        cc
      }
      formFields {
        __typename
        id
        name
        placeHolderText
        fieldType
        isRequired
        validation
      }
    }
  }
  ... on FooterRecord {
    __typename
    id
    title
    bodycopy
    emailAddress
    navLinkReference {
      __typename
      linkTitle
      links {
        __typename
        id
        linktext
        linklocation
      }
    }
    resumeReference {
      viewResumeText
      downloadResumeText
      resumeFileName
      __typename
      id
      resumeCv {
        url
      }
    }
    socialShareReference {
      __typename
      id
      title
      socialLinks {
        __typename
        id
        iconCode
        link
      }
    }
    copyrightText
  }
`;

// Full page query filtered by slug
export const pageBySlugQuery = `query getPageBySlug($slug: String!) {
  allPages(filter: { slug: { eq: $slug } }) {
    pageTitle
    slug
    components {
      ${componentFragments}
    }
  }
}`;

// Legacy: fetch all pages (kept for backward compatibility)
export const pageQuery = `query getPageByPath {
  allPages {
    pageTitle
    slug
    components {
      ${componentFragments}
    }
  }
}`;
