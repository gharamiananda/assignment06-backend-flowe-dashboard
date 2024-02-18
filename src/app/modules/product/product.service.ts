import { JwtPayload } from "jsonwebtoken";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createProductIntoDB = async (userData:JwtPayload,payload: TProduct,file:any) => {
const slugName=payload.name.split(' ').join('-');



if (file) {
  const imageName = `${userData?._id}${payload?.name}`;
  const path = file?.path;

  //send image to cloudinary
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  payload.images = [secure_url as string]
}

  const result = await Product.create({...payload,createdBy:userData._id,slug:slugName});

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {


  
  const productQuery = new QueryBuilder(
    Product.find({isDeleted:false})
      .populate('createdBy'),
    query,
  )
    .search(['name','color'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
  // const result = await Product.find({isDeleted:false}).populate('createdBy');

  // return result;
};

const getSingleProductFromDB = async (slug: string) => {
  const result = await Product.findOne({slug});

  return result;
};


const getFilterOptionsFromDB = async () => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: null,
        types: { $addToSet: "$type" },
        sizes: { $addToSet: "$size" },
        colors: { $addToSet: "$color" },
        fragrances: { $addToSet: "$fragrance" }
      }
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
        types: 1,
        sizes: 1,
        colors: 1,
        fragrances: 1
      }
    }
  ]);

  return result;
};

const deleteProductsIntoDB = async (productSlugs: string[]) => {
  console.log('productSlugs :>> ', productSlugs);
  const result = await Product.updateMany({
    slug:
        {
            $in:productSlugs
                
        }
},
{
   $set: { isDeleted: true} 


},
{upsert: true,multi: true }
  );

  return result;
};

const updateProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(id, payload);

  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductsIntoDB,
  updateProductIntoDB,
  getFilterOptionsFromDB
};
