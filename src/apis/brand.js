import { getTakenData } from "."

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

const postBrands = async () =>{
    try {
        let formData = new FormData();
        formData.append("")
    } catch (error) {
        
    }
}

export default {
    getAllBrand
}