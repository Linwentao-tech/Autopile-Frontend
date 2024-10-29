import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { auth } from "../auth";

async function DynamicUserIconBlur() {
  const session = await auth();
  let base64 = "";

  if (session?.user?.image) {
    try {
      const buffer = await fetch(session.user.image).then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return Buffer.from(await res.arrayBuffer());
      });

      const result = await getPlaiceholder(buffer);
      base64 = result.base64;
    } catch (error) {
      console.error("Error generating blur data:", error);
    }
  }

  return (
    <div>
      {session && session.user && (
        <div className="flex items-center gap-6">
          <p className="mt-0.5 font-bold text-lg">
            Welcome back, {session.user.name}
          </p>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="User icon"
              width={50}
              height={50}
              className="rounded-full"
              quality={100}
              blurDataURL={base64 || undefined}
              placeholder={base64 ? "blur" : "empty"}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DynamicUserIconBlur;
