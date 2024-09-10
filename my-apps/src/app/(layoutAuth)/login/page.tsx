import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default function Login() {
  const handeLogin = async (formData: FormData) => {
    "use server";
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
      {
        method: "POST",
        body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = (await response.json()) as { error: string };
      console.log(errorBody, "ini error <<<<<<<");
      return redirect("/login?error=" + errorBody.error);
    }
    const responseBody = (await response.json()) as { access_token: string };
    cookies().set("Authorization", "Bearer " + responseBody.access_token);

    return redirect("/");
  };

  return (
    <div className="bg-[#f1e2e8] dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3 rounded-md"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                PrimePicks
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Experience the Best of Shopping with Our Curated Collection,
                Offering You Personalized Choices and Unmatched Quality for
                Every Occasion
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-[#856771] dark:text-gray-300 font-extrabold text-2xl">
                Prime Picks
              </p>
            </div>
            <div className="mt-8">
              <form action={handeLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-[#856771] dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-[#856771] dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-[#856771] rounded-lg dark:placeholder-[#856771] dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-300 transform bg-transparent border-2 border-[#856771] rounded-lg hover:bg-[#856771] focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-[#856771]">
                Dont have an account yet?{" "}
                <Link
                  href="register"
                  className="text-[#5a1222] focus:outline-none focus:underline hover:underline font-extrabold"
                >
                  Register
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
