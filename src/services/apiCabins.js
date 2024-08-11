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
