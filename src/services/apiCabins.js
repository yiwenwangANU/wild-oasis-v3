import supabase from "../services/supabase";
import { supabaseUrl } from "../services/supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Error(apiCabins): Could not get cabins from supabase");
  }
  return cabins;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.log("Error(apiCabins): Failed to delete cabin from supabase");
    throw new Error("Failed to delete cabin.");
  }
}

export async function duplicateCabin(cabin) {
  const { id, created_at, name, ...rest } = cabin; // id, created_at is intentionally not used

  const { error } = await supabase
    .from("cabins")
    .insert([{ ...rest, name: `cpoy of ${name}` }])
    .select();
  if (error) {
    console.log(error.message);
    throw new Error("Failed to duplicate cabin.");
  }
}

export async function CreateCabin(newCabin) {
  const { image, ...cabinData } = newCabin;
  const cabinImage = image[0];
  const cabinName = `${Math.random()}_${cabinImage.name}`;
  const cabinUrl = `${supabaseUrl}storage/v1/object/public/cabin-images/${cabinName}`;

  const { data, error: cabinDataError } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: cabinUrl }])
    .select();
  if (cabinDataError) {
    console.log(cabinDataError.message);
    throw new Error("Failed to create cabin.");
  }

  const { error: cabinImageError } = await supabase.storage
    .from("cabin-images")
    .upload(cabinName, cabinImage, {
      cacheControl: "3600",
      upsert: false,
    });
  if (cabinImageError) {
    console.log(cabinImageError.message);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Failed to upload cabin image.");
  }
}

export async function editCabin(cabin) {
  const { id, created_at, image, ...rest } = cabin; // created_at is intentionally not used
  const isUploadingImg = typeof image !== "string";

  const { error: cabinDataError } = await supabase
    .from("cabins")
    .update(rest)
    .eq("id", id)
    .select();
  if (cabinDataError) {
    console.log(cabinDataError.message);
    throw new Error("Failed to update cabin.");
  }

  if (isUploadingImg) {
    const cabinImage = image[0];
    const imageName = `${Math.random()}_${cabinImage.name}`;
    const imageUrl = `${supabaseUrl}storage/v1/object/public/cabin-images/${imageName}`;

    const { error: cabinImageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinImage, {
        cacheControl: "3600",
        upsert: false,
      });
    if (cabinImageError) {
      console.log(cabinImageError.message);
      throw new Error("Failed to upload cabin image.");
    }

    const { error: imageNameError } = await supabase
      .from("cabins")
      .update({ image: imageUrl })
      .eq("id", id)
      .select();
    if (imageNameError) {
      console.log(imageNameError.message);
      throw new Error("Failed to update cabin.");
    }
  }
}
