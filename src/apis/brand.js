import { getTakenData, postTakenData } from "."

const getAllBrand = async (limit, page) => {
   try{
    return await getTakenData("/v1/brands", {
        limit,
        page
    })
   }
   catch(error){
    throw error;
   }
}

const postBrand = async (
    brandImage,
    brandName,
    published,
    slug
) => {
    try {
        return await postTakenData("/v1/brands", {
            brandImage,
            brandName,
            published,
            slug
        })
    } catch (error) {
        throw error;
    }
}

export default {
    getAllBrand,
    postBrand,
}