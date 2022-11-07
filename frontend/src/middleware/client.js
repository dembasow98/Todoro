import sanityClient from '@sanity/client'


export const client =  sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion:process.env.REACT_APP_SANITY_API_VERSION,
    token: process.env.REACT_APP_SANITY_TOKEN,
    withCredentials: true,
    useCdn: false
});