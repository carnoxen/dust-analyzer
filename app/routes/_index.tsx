import type { Dust } from "components/DustProvider";
import type { Route } from "./+types/_index";
import DustProvider, { DEFAULT_SIDO, useDusts } from "components/DustProvider";
import DustSection from "components/DustSection";
import SidoSelector from "components/SidoSelector";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const env = import.meta.env;
  const params = new URLSearchParams({
    serviceKey: env["VITE_KEY"]!,
    returnType: env["VITE_TYPE"]!,
    ver: env["VITE_VER"]!,
    numOfRows: env["VITE_NUMOFROWS"]!,
    sidoName: env["VITE_PUBLIC_DEFAULT_SIDO"]!,
  });
  const address = `${env["VITE_BASE"]!}?${params.toString()}`;

  const dusts = await fetch(address)
    .then(x => x.json())
    .then(x => x["response"]["body"]["items"] as Dust[]);
  return dusts;
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  const dusts = loaderData;
  const { state } = useDusts();

  return (
    <DustProvider>
      <main className="flex items-center justify-center pt-16 pb-4">
        <h1>초미세먼지 모음</h1>
        {
        dusts
          .filter(({ sidoName, bookmarked }) => state.sido === DEFAULT_SIDO || 
            ((sidoName === state.sido) && (!state.bookmark || bookmarked)))
          .map(x => <DustSection {...x} />)
        }
        <SidoSelector />
      </main>
    </DustProvider>
  );
}