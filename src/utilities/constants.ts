export const pageQuery = `query getPageByPath {
  allPages {
    pageTitle
    components {
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
          formFields {
            __typename
            id
            name
            placeHolderText
            fieldType
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
        resumeFileName
        downloadResumeText
      }
    }
  }
}`;
export const dataocmsApiUrl = "https://graphql.datocms.com/";
