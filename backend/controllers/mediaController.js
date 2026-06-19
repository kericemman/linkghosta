import MediaAsset from "../models/MediaAsset.js";
import { deleteImage, uploadImage, uploadRawFile } from "../services/cloudinaryService.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

export async function getMediaAssets(req,res){const items=await MediaAsset.find().sort({createdAt:-1}).lean();return sendResponse(res,200,"Media assets",items)}
export async function createMediaAsset(req,res){if(!req.file)throw new ApiError("Choose a file to upload",400);const isImage=req.file.mimetype.startsWith("image/");const result=await(isImage?uploadImage:uploadRawFile)(req.file.buffer,{folder:"linkghosta",use_filename:true,unique_filename:true});const item=await MediaAsset.create({title:req.body.title||req.file.originalname,publicId:result.public_id,url:result.secure_url,resourceType:result.resource_type,format:result.format,bytes:result.bytes,createdBy:req.admin._id});return sendResponse(res,201,"Media uploaded",item)}
export async function getMediaAsset(req,res){const item=await MediaAsset.findById(req.params.id).lean();if(!item)throw new ApiError("Media asset not found",404);return sendResponse(res,200,"Media asset",item)}
export async function updateMediaAsset(req,res){const item=await MediaAsset.findByIdAndUpdate(req.params.id,{title:req.body.title?.trim()},{new:true,runValidators:true});if(!item)throw new ApiError("Media asset not found",404);return sendResponse(res,200,"Media updated",item)}
export async function deleteMediaAsset(req,res){const item=await MediaAsset.findById(req.params.id);if(!item)throw new ApiError("Media asset not found",404);if(item.publicId)await deleteImage(item.publicId,item.resourceType);await item.deleteOne();return sendResponse(res,200,"Media deleted")}
