import { redirect } from "next/navigation";

/**
 * Bare-domain root → redirect to the English locale.
 *
 * Future iterations may parse Accept-Language to pick TH for Thai
 * visitors; for now we send everyone to /en and let them switch
 * via the language toggle in the corner.
 */
export default function RootRedirect() {
  redirect("/en");
}
