import supabase from "../services/supabase";

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
