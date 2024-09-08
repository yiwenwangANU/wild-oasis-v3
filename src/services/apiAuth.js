import supabase from "./supabase";

export async function Login({ email, password }) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Login error:", error.message);
    throw new Error("User name or password incorrect.");
  }
  return user;
}
